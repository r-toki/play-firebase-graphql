import { gql, useApolloClient } from "@apollo/client";
import { query, Timestamp, where } from "firebase/firestore";
import { useEffect, useMemo } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

import { db } from "../firebase-app";
import {
  useFavoriteTweetsForIndexPageLazyQuery,
  useFeedForIndexPageQuery,
  useTweetEdgeForIndexPageLazyQuery,
} from "../graphql/generated";
import { tweetEventsRef } from "../lib/typed-ref";
import { useAuthed } from "./../context/Authed";

gql`
  query feedForIndexPage($first: Int!, $after: String) {
    me {
      id
      feed(first: $first, after: $after) {
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
  }

  query favoriteTweetsForIndexPage($first: Int!, $after: String) {
    me {
      id
      favoriteTweets(first: $first, after: $after) {
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
  }

  query tweetEdgeForIndexPage($id: ID!) {
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
  const { data, loading, fetchMore } = useFeedForIndexPageQuery({
    variables: { first: 20 },
    notifyOnNetworkStatusChange: true,
  });

  const tweets = data?.me.feed.edges.map(({ node }) => node) ?? [];
  const hasNext = data?.me.feed.pageInfo.hasNext;
  const endCursor = data?.me.feed.pageInfo.endCursor;

  const loadMore = () => {
    fetchMore({ variables: { first: 10, after: endCursor } });
  };

  return { tweets, hasNext, loading, loadMore };
};

export const useFavoriteTweets = () => {
  const [fetch, { data, loading, fetchMore }] = useFavoriteTweetsForIndexPageLazyQuery({
    variables: { first: 20 },
    notifyOnNetworkStatusChange: true,
  });

  const favoriteTweets = data?.me.favoriteTweets;
  const tweets = favoriteTweets?.edges.map(({ node }) => node) ?? [];
  const hasNext = favoriteTweets?.pageInfo.hasNext;
  const endCursor = favoriteTweets?.pageInfo.endCursor;

  const loadMore = () => {
    fetchMore({ variables: { first: 10, after: endCursor } });
  };

  return { tweets, hasNext, loading, fetch, loadMore };
};

export const useSubscribeTweets = () => {
  const client = useApolloClient();

  const { currentUser } = useAuthed();
  const [getTweetEdge] = useTweetEdgeForIndexPageLazyQuery();

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

        client.cache.modify({
          id: client.cache.identify({ __typename: "User", id: currentUser.id }),
          fields: {
            feed(existing) {
              if (!existing) return existing;
              const pageInfo = existing.pageInfo;
              if (pageInfo.endCursor > tweetEdge.cursor) return existing;
              const edges = [tweetEdge, ...existing.edges];
              return { ...existing, edges };
            },
          },
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

        client.cache.modify({
          id: client.cache.identify({ __typename: "User", id: currentUser.id }),
          fields: {
            feed(existing) {
              const edges = existing.edges.filter(
                (v: any) => v.node.__ref !== `Tweet:${change.doc.data().tweetId}`
              );
              return { ...existing, edges };
            },
            favoriteTweets(existing) {
              const edges = existing.edges.filter(
                (v: any) => v.node.__ref !== `Tweet:${change.doc.data().tweetId}`
              );
              return { ...existing, edges };
            },
          },
        });
      }
    });
  }, [tweetEvents]);
};
