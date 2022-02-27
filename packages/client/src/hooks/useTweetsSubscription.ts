import { gql, useApolloClient } from "@apollo/client";
import { query, Timestamp, where } from "firebase/firestore";
import { useEffect, useMemo } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

import { db } from "../firebase-app";
import {
  FavoriteTweetsDocument,
  FeedDocument,
  TweetsDocument,
  useTweetEdgeLazyQuery,
} from "../graphql/generated";
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
`;

export const useTweetsSubscription = (userId: string) => {
  const client = useApolloClient();

  const [getTweetEdge] = useTweetEdgeLazyQuery();

  const now = useMemo(() => Timestamp.now(), []);
  const [tweetEvents] = useCollection(query(tweetEventsRef(db), where("createdAt", ">=", now)));

  useEffect(() => {
    tweetEvents?.docChanges().forEach(async (change) => {
      if (change.type !== "added") return;

      if (change.doc.data().type === "create") {
        console.log("--- tweet has been created ---");

        const tweetEdgeResult = await getTweetEdge({
          variables: { id: change.doc.data().tweetId },
        });
        const tweetEdge = tweetEdgeResult.data?.tweetEdge;
        if (!tweetEdge) return;

        client.cache.updateQuery(
          { query: FeedDocument, overwrite: true, variables: { userId } },
          (data) => {
            if (!data) return data;
            const edges = [tweetEdge, ...data.user.feed.edges];
            const merged = { ...data, user: { ...data.user, feed: { ...data.user.feed, edges } } };
            return merged;
          }
        );

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
          { query: FeedDocument, overwrite: true, variables: { userId } },
          (data) => {
            if (!data) return data;
            const edges = [...data.user.feed.edges].filter(
              (v) => v.node.id !== change.doc.data().tweetId
            );
            const merged = { ...data, user: { ...data.user, feed: { ...data.user.feed, edges } } };
            return merged;
          }
        );

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

        client.cache.updateQuery(
          { query: FavoriteTweetsDocument, overwrite: true, variables: { userId } },
          (data) => {
            if (!data) return data;
            const edges = [...data.user.favoriteTweets.edges].filter(
              (v) => v.node.id !== change.doc.data().tweetId
            );
            const merged = {
              ...data,
              user: { ...data.user, favoriteTweets: { ...data.user.favoriteTweets, edges } },
            };
            return merged;
          }
        );
      }
    });
  }, [tweetEvents]);
};
