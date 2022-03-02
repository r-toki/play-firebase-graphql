import { gql, useApolloClient } from "@apollo/client";
import { DocumentChange, onSnapshot, query, Timestamp, where } from "firebase/firestore";
import { TweetEventData } from "interfaces/web-schema";
import { chunk } from "lodash-es";
import { useEffect, useMemo } from "react";

import { db } from "../firebase-app";
import {
  Tweet_Filter,
  TweetsDocument,
  useTweetEdgeLazyQuery,
  useUserForTweetsSubscriptionQuery,
} from "../graphql/generated";
import { tweetEventsRef } from "../lib/typed-ref";

gql`
  query TweetEdge($id: ID!) {
    tweetEdge(id: $id) {
      node {
        id
        ...TweetItem
      }
      cursor
    }
  }

  query UserForTweetsSubscription($id: ID!) {
    user(id: $id) {
      id
      followings {
        id
      }
    }
  }
`;

export const useTweetsSubscription = (userId: string, filters: Tweet_Filter[]) => {
  const client = useApolloClient();

  const { data } = useUserForTweetsSubscriptionQuery({ variables: { id: userId } });

  const watchedUserIds = useMemo(() => {
    const res: string[] = [];
    if (!data) return res;
    if (filters.includes("SELF")) res.push(data.user.id);
    if (filters.includes("FOLLOWINGS")) res.push(...data.user.followings.map(({ id }) => id));
    return res;
  }, [data, filters]);

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

  useEffect(() => {
    if (!watchedUserIds.length) return;

    const unsubs: (() => void)[] = [];

    chunk(watchedUserIds, 10).map((chunkedWatchedUserIds) => {
      const unsub = onSnapshot(
        query(
          tweetEventsRef(db),
          where("userId", "in", chunkedWatchedUserIds),
          where("createdAt", ">=", Timestamp.now())
        ),
        (snap) => snap.docChanges().forEach(cb)
      );
      unsubs.push(unsub);
    });

    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  }, [watchedUserIds]);
};
