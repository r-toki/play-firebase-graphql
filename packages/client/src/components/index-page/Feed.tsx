import { gql } from "@apollo/client";
import { Box, Button, HStack, Stack } from "@chakra-ui/react";
import { format } from "date-fns";
import { VFC } from "react";

import { useFeedForIndexPageQuery } from "../../graphql/generated";
import { AppList, AppListItem } from "../shared/AppList";

gql`
  query FeedForIndexPage($cursor: DateTime, $limit: Int!) {
    feed(cursor: $cursor, limit: $limit) {
      id
      content
      createdAt
      creator {
        id
        displayName
      }
    }
  }
`;

const useFeed = () => {
  const { data, fetchMore } = useFeedForIndexPageQuery({
    variables: { limit: 10 },
  });
  const tweets = data?.feed ?? [];

  return { tweets, fetchMore };
};

export const Feed: VFC = () => {
  const { tweets, fetchMore } = useFeed();

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
          <Button
            onClick={() => {
              fetchMore({ variables: { cursor: tweets.slice(-1)[0]?.createdAt, limit: 10 } });
            }}
          >
            Fetch More
          </Button>
        </AppList>
      )}
    </Stack>
  );
};
