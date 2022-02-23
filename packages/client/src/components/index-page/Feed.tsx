import { gql, useApolloClient } from "@apollo/client";
import { Box, Center, HStack, Spinner, Stack } from "@chakra-ui/react";
import { format } from "date-fns";
import { query, Timestamp, where } from "firebase/firestore";
import { useEffect, useMemo, VFC } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

import { db } from "../../firebase-app";
import {
  FeedForIndexPageDocument,
  useFeedForIndexPageQuery,
  useOneOfFeedForIndexPageLazyQuery,
} from "../../graphql/generated";
import { tweetEventsRef } from "../../lib/typed-ref";
import { AppList, AppListItem } from "../shared/AppList";
import { MoreSpinner } from "../shared/AppMoreSpinner";

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

  query oneOfFeedForIndexPage($id: ID!) {
    oneOfFeed(id: $id) {
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

const useFeed = () => {
  const { data, loading, fetchMore } = useFeedForIndexPageQuery({
    variables: { first: 20 },
    notifyOnNetworkStatusChange: true,
  });

  const tweets = data?.feed.edges.map(({ node }) => node) ?? [];
  const hasNext = data?.feed.pageInfo.hasNext;
  const endCursor = data?.feed.pageInfo.endCursor;

  return { tweets, hasNext, endCursor, loading, fetchMore };
};

const useSubscribeFeed = () => {
  const client = useApolloClient();
  const [getOneOfFeed, { data: oneOfFeedData }] = useOneOfFeedForIndexPageLazyQuery();
  const newOneOfFeed = oneOfFeedData?.oneOfFeed;

  useEffect(() => {
    if (!newOneOfFeed) return;
    // client.cache.updateQuery({ query: FeedForIndexPageDocument }, (data) => {
    //   if (!data) return data;
    //   return {
    //     feed: { ...data.feed, edges: [newOneOfFeed] },
    //   };
    // });
  }, [newOneOfFeed]);

  const now = useMemo(() => Timestamp.now(), []);
  const [tweetEvents] = useCollection(query(tweetEventsRef(db), where("createdAt", ">=", now)));

  useEffect(() => {
    tweetEvents?.docChanges().forEach(async (change) => {
      if (change.type !== "added") return;

      if (change.doc.data().type === "create") {
        console.log("--- tweet has been created ---");
      }

      if (change.doc.data().type === "update") {
        console.log("--- tweet has been updated ---");
      }

      if (change.doc.data().type === "delete") {
        console.log("--- tweet has been deleted ---");
      }
    });
  }, [tweetEvents]);
};

export const Feed: VFC = () => {
  const { tweets, hasNext, endCursor, loading, fetchMore } = useFeed();
  useSubscribeFeed();

  return (
    <Stack>
      <Box alignSelf="center" fontWeight="bold">
        Tweets
      </Box>
      {tweets.length && (
        <AppList>
          {tweets.map((tweet) => (
            <AppListItem key={tweet.id}>
              <Box>
                <HStack>
                  <Box fontWeight="bold">{tweet.creator.displayName}</Box>
                  <Box>{format(new Date(tweet.createdAt), "yyyy-MM-dd HH:mm")}</Box>
                </HStack>
                <Box>{tweet.content}</Box>
              </Box>
            </AppListItem>
          ))}
          {loading ? (
            <AppListItem>
              <Center>
                <Spinner />
              </Center>
            </AppListItem>
          ) : hasNext ? (
            <AppListItem>
              <Center>
                <MoreSpinner
                  cb={fetchMore.bind(null, { variables: { first: 10, after: endCursor } })}
                />
              </Center>
            </AppListItem>
          ) : null}
        </AppList>
      )}
    </Stack>
  );
};
