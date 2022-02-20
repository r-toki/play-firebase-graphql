import { gql } from "@apollo/client";
import { Box, HStack, Stack } from "@chakra-ui/react";
import { format } from "date-fns";
import { VFC } from "react";

import { useFeedForIndexPageQuery } from "../../graphql/generated";
import { AppList, AppListItem } from "../shared/AppList";

gql`
  query feedForIndexPage {
    feed {
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
  const { data } = useFeedForIndexPageQuery();
  const tweets = data?.feed ?? [];

  return { tweets };
};

export const Feed: VFC = () => {
  const { tweets } = useFeed();

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
        </AppList>
      )}
    </Stack>
  );
};
