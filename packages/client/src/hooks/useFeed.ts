import { gql, useApolloClient } from "@apollo/client";
import { query, Timestamp, where } from "firebase/firestore";
import { useEffect, useMemo } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

import { db } from "../firebase-app";
import {
  useFavoriteTweetsForIndexPageQuery,
  useFeedForIndexPageQuery,
  useTweetEdgeForIndexPageLazyQuery,
} from "../graphql/generated";
import { tweetEventsRef } from "../lib/typed-ref";

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
  const { data, loading, fetchMore } = useFavoriteTweetsForIndexPageQuery({
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

  return { tweets, hasNext, loading, loadMore };
};

export const useSubscribeTweets = () => {
  const client = useApolloClient();
  const [getTweetEdge] = useTweetEdgeForIndexPageLazyQuery();

  const now = useMemo(() => Timestamp.now(), []);
  const [tweetEvents] = useCollection(query(tweetEventsRef(db), where("createdAt", ">=", now)));

  useEffect(() => {
    tweetEvents?.docChanges().forEach(async (change) => {
      if (change.type !== "added") return;

      if (change.doc.data().type === "create" || change.doc.data().type === "update") {
        console.log("--- tweet has been created/updated ---");
      }

      if (change.doc.data().type === "delete") {
        console.log("--- tweet has been deleted ---");
      }
    });
  }, [tweetEvents]);
};
