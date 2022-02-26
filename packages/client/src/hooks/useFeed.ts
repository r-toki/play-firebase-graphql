import { gql, useApolloClient } from "@apollo/client";
import { query, Timestamp, where } from "firebase/firestore";
import { useEffect, useMemo } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

import { db } from "../firebase-app";
import { useFavoriteTweetsQuery, useFeedQuery, useTweetEdgeLazyQuery } from "../graphql/generated";
import { tweetEventsRef } from "../lib/typed-ref";
import { useAuthed } from "./../context/Authed";
import { FeedDocument } from "./../graphql/generated";

gql`
  query feed($input: FeedInput!) {
    feed(input: $input) {
      edges {
        node {
          id
          ...feedItem
        }
        cursor
      }
      pageInfo {
        hasNext
        endCursor
      }
    }
  }

  query favoriteTweets($input: FavoriteTweetsInput!) {
    favoriteTweets(input: $input) {
      edges {
        node {
          id
          ...feedItem
        }
        cursor
      }
      pageInfo {
        hasNext
        endCursor
      }
    }
  }

  query tweetEdge($id: ID!) {
    tweetEdge(id: $id) {
      node {
        id
        ...feedItem
      }
      cursor
    }
  }
`;

export const useFeed = () => {
  const { currentUser } = useAuthed();

  const { data, loading, fetchMore } = useFeedQuery({
    variables: { input: { userId: currentUser.id, first: 10 } },
    notifyOnNetworkStatusChange: true,
  });

  const tweets = data?.feed.edges.map(({ node }) => node) ?? [];
  const hasNext = data?.feed.pageInfo.hasNext;
  const endCursor = data?.feed.pageInfo.endCursor;

  const loadMore = () => {
    fetchMore({ variables: { input: { userId: currentUser.id, first: 10, after: endCursor } } });
  };

  return { tweets, hasNext, loading, loadMore };
};

export const useFavoriteTweets = () => {
  const { currentUser } = useAuthed();

  const { data, loading, fetchMore } = useFavoriteTweetsQuery({
    variables: { input: { userId: currentUser.id, first: 20 } },
    notifyOnNetworkStatusChange: true,
  });

  const favoriteTweets = data?.favoriteTweets;
  const tweets = favoriteTweets?.edges.map(({ node }) => node) ?? [];
  const hasNext = favoriteTweets?.pageInfo.hasNext;
  const endCursor = favoriteTweets?.pageInfo.endCursor;

  const loadMore = () => {
    fetchMore({ variables: { input: { userId: currentUser.id, first: 10, after: endCursor } } });
  };

  return { tweets, hasNext, loading, loadMore };
};

export const useSubscribeTweets = () => {
  const client = useApolloClient();

  // const { currentUser } = useAuthed();
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

        client.cache.updateQuery({ query: FeedDocument, overwrite: true }, (data) => {
          if (!data) return data;
          return { ...data, feed: { ...data.feed, edges: [tweetEdge, ...data.feed.edges] } };
        });
      }

      if (change.doc.data().type === "update") {
        console.log("--- tweet has been updated ---");
        await getTweetEdge({
          variables: { id: change.doc.data().tweetId },
        });
      }

      if (change.doc.data().type === "delete") {
        console.log("--- tweet has been deleted ---");
      }
    });
  }, [tweetEvents]);
};
