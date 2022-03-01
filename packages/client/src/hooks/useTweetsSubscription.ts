import { gql, useApolloClient } from "@apollo/client";
import { DocumentChange, onSnapshot, query, Timestamp, where } from "firebase/firestore";
import { TweetEventData } from "interfaces/web-schema";
import { chunk } from "lodash-es";
import { useEffect, useMemo } from "react";

import { db } from "../firebase-app";
import { TweetsDocument, useFollowingsQuery, useTweetEdgeLazyQuery } from "../graphql/generated";
import { tweetEventsRef } from "../lib/typed-ref";

gql`
  query tweetEdge($id: ID!) {
    tweetEdge(id: $id) {
      node {
        id
        ...tweetItem
      }
      cursor
    }
  }

  query followings($id: ID!) {
    user(id: $id) {
      id
      followings {
        id
      }
    }
  }
`;

// TODO: Likes を表示している時は created を追加しない
// TODO: tweetUserId を currentUser.id + followings.map(v => v.id) に対応させたい
export const useTweetsSubscription = (userId: string) => {
  const client = useApolloClient();

  const [getTweetEdge] = useTweetEdgeLazyQuery();

  const cb = async (change: DocumentChange<TweetEventData>) => {
    if (change.type !== "added") return;

    if (change.doc.data().type === "create") {
      console.log("--- tweet has been created ---");

      const tweetEdgeResult = await getTweetEdge({
        variables: { id: change.doc.data().tweetId },
      });
      const tweetEdge = tweetEdgeResult.data?.tweetEdge;
      if (!tweetEdge) return;

      client.cache.updateQuery(
        { query: TweetsDocument, overwrite: true, variables: { userId } },
        (data) => {
          if (!data) return data;
          const edges = [tweetEdge, ...data.user.tweets.edges];
          const merged = {
            ...data,
            user: { ...data.user, tweets: { ...data.user.tweets, edges } },
          };
          return merged;
        }
      );
    }

    if (change.doc.data().type === "update") {
      console.log("--- tweet has been updated ---");
      await getTweetEdge({
        variables: { id: change.doc.data().tweetId },
      });
    }

    if (change.doc.data().type === "delete") {
      console.log("--- tweet has been deleted ---");

      client.cache.updateQuery(
        { query: TweetsDocument, overwrite: true, variables: { userId } },
        (data) => {
          if (!data) return data;
          const edges = [...data.user.tweets.edges].filter(
            (v) => v.node.id !== change.doc.data().tweetId
          );
          const merged = {
            ...data,
            user: { ...data.user, tweets: { ...data.user.tweets, edges } },
          };
          return merged;
        }
      );
    }
  };

  const { data } = useFollowingsQuery({ variables: { id: userId } });

  const watchedUserIds = useMemo(
    () => (data ? [data.user.id, ...data.user.followings.map((v) => v.id)] : []),
    [data]
  );

  useEffect(() => {
    if (!data) return;
    chunk(watchedUserIds, 10).map((chunkedWatchedUserIds) => {
      onSnapshot(
        query(
          tweetEventsRef(db),
          where("userId", "in", chunkedWatchedUserIds),
          where("createdAt", ">=", Timestamp.now())
        ),
        (snap) => snap.docChanges().forEach(cb)
      );
    });
  }, [watchedUserIds]);
};
