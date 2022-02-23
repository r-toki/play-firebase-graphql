import { Box, Center, HStack, Spinner, Stack } from "@chakra-ui/react";
import { format } from "date-fns";
import { VFC } from "react";

import { useFeed, useSubscribeFeed } from "../../hooks/useFeed";
import { AppList, AppListItem } from "../shared/AppList";
import { MoreSpinner } from "../shared/AppMoreSpinner";

export const Feed: VFC = () => {
  const { tweets, hasNext, loading, loadMore } = useFeed();
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
                <MoreSpinner cb={loadMore} />
              </Center>
            </AppListItem>
          ) : null}
        </AppList>
      )}
    </Stack>
  );
};
