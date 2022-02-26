import { gql, useApolloClient } from "@apollo/client";
import { query, Timestamp, where } from "firebase/firestore";
import { orderBy, uniqBy } from "lodash-es";
import { useEffect, useMemo } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

import { db } from "../firebase-app";
import {
  FeedForIndexPageDocument,
  FeedForIndexPageQuery,
  useFavoriteTweetsForIndexPageLazyQuery,
  useFeedForIndexPageQuery,
  useTweetEdgeForIndexPageLazyQuery,
} from "../graphql/generated";
import { tweetEventsRef } from "../lib/typed-ref";

gql`
  query feedForIndexPage($first: Int!, $after: String) {
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

  query favoriteTweetsForIndexPage($first: Int!, $after: String) {
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

  const tweets = data?.feed.edges.map(({ node }) => node) ?? [];
  const hasNext = data?.feed.pageInfo.hasNext;
  const endCursor = data?.feed.pageInfo.endCursor;

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

  const tweets = data?.favoriteTweets.edges.map(({ node }) => node) ?? [];
  const hasNext = data?.favoriteTweets.pageInfo.hasNext;
  const endCursor = data?.favoriteTweets.pageInfo.endCursor;

  const loadMore = () => {
    fetchMore({ variables: { first: 10, after: endCursor } });
  };

  return { tweets, hasNext, loading, fetch, loadMore };
};

export const useSubscribeTweets = () => {
  const client = useApolloClient();
  const [getTweetEdge] = useTweetEdgeForIndexPageLazyQuery();

  const now = useMemo(() => Timestamp.now(), []);
  const [tweetEvents] = useCollection(query(tweetEventsRef(db), where("createdAt", ">=", now)));

  useEffect(() => {
    tweetEvents?.docChanges().forEach(async (change) => {
      if (change.type !== "added") return;

      type Data = FeedForIndexPageQuery | null;

      if (change.doc.data().type === "create" || change.doc.data().type === "update") {
        console.log("--- tweet has been created/updated ---");

        const tweetEdgeResult = await getTweetEdge({
          variables: { id: change.doc.data().tweetId },
        });
        const tweetEdge = tweetEdgeResult.data?.tweetEdge;

        client.cache.updateQuery(
          { query: FeedForIndexPageDocument, overwrite: true },
          (data: Data): Data => {
            if (!data) return data;
            if (!tweetEdge) return data;
            if (data.feed.pageInfo.endCursor) {
              if (data.feed.pageInfo.endCursor > tweetEdge.cursor) return data;
            }

            const edges = orderBy(
              uniqBy([...data.feed.edges, tweetEdge], (v) => v.node.id),
              (v) => v.cursor,
              "desc"
            );

            return {
              feed: { ...data.feed, edges },
            };
          }
        );
      }

      if (change.doc.data().type === "delete") {
        console.log("--- tweet has been deleted ---");

        client.cache.updateQuery(
          { query: FeedForIndexPageDocument, overwrite: true },
          (data: Data): Data => {
            if (!data) return data;

            const edges = data.feed.edges.filter((v) => v.node.id !== change.doc.data().tweetId);

            return {
              feed: { ...data.feed, edges },
            };
          }
        );
      }
    });
  }, [tweetEvents]);
};
