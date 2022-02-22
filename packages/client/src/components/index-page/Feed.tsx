import { gql } from "@apollo/client";
import { Box, Center, HStack, Spinner, Stack } from "@chakra-ui/react";
import { format } from "date-fns";
import { VFC } from "react";

import { useFeedForIndexPageQuery } from "../../graphql/generated";
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
      }
      pageInfo {
        hasNext
        endCursor
      }
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

export const Feed: VFC = () => {
  const { tweets, hasNext, endCursor, loading, fetchMore } = useFeed();

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
          <AppListItem>
            {loading ? (
              <Center>
                <Spinner />
              </Center>
            ) : hasNext ? (
              <MoreSpinner
                cb={fetchMore.bind(null, { variables: { first: 10, after: endCursor } })}
              />
            ) : null}
          </AppListItem>
        </AppList>
      )}
    </Stack>
  );
};
