import { gql } from "@apollo/client";
import { Box, HStack, Stack } from "@chakra-ui/react";
import { format } from "date-fns";
import { VFC } from "react";

import { useTweetsForIndexPageQuery } from "../../graphql/generated";
import { AppList, AppListItem } from "../shared/AppList";

gql`
  query tweetsForIndexPage {
    tweets {
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

const useTweets = () => {
  const { data } = useTweetsForIndexPageQuery();
  const tweets = data?.tweets ?? [];

  return { tweets };
};

export const Tweets: VFC = () => {
  const { tweets } = useTweets();

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
