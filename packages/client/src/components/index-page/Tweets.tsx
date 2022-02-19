import { gql } from "@apollo/client";
import { Box, Stack } from "@chakra-ui/react";
import { VFC } from "react";

import { useTweetsForIndexPageQuery } from "../../graphql/generated";

gql`
  query tweetsForIndexPage {
    tweets {
      id
      content
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
      {tweets.map((tweet) => (
        <Stack key={tweet.id} border="1px">
          <Box>{tweet.creator.displayName}</Box>
          <Box>{tweet.content}</Box>
        </Stack>
      ))}
    </Stack>
  );
};
