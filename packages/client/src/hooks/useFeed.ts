import { gql, useApolloClient } from "@apollo/client";
import { query, Timestamp, where } from "firebase/firestore";
import { orderBy, uniqBy } from "lodash-es";
import { useEffect, useMemo } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

import { db } from "../firebase-app";
import {
  FeedForIndexPageDocument,
  FeedForIndexPageQuery,
  useFeedForIndexPageQuery,
  useTweetEdgeForIndexPageLazyQuery,
} from "../graphql/generated";
import { tweetEventsRef } from "../lib/typed-ref";

gql`
  query FeedForIndexPage($first: Int!, $after: String) {
    feed(first: $first, after: $after) {
      edges {
        node {
          id
          content
          createdAt
          creator {
            id
            displayName
          }
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
        content
        createdAt
        creator {
          id
          displayName
        }
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

export const useSubscribeFeed = () => {
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

        const oneOfFeedResult = await getTweetEdge({
          variables: { id: change.doc.data().tweetId },
        });
        const tweetEdge = oneOfFeedResult.data?.tweetEdge;

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
