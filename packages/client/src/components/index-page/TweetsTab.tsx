import { Center, Spinner, Stack, Tab, TabList, Tabs } from "@chakra-ui/react";
import { useState, VFC } from "react";

import { useAuthed } from "../../context/Authed";
import { useSubscribeTweets } from "../../hooks/useSubscribeTweets";
import { useFeed } from "../../hooks/useTweets";
import { AppList, AppListItem } from "../shared/AppList";
import { MoreSpinner } from "../shared/AppMoreSpinner";
import { TweetItem } from "./TweetItem";

const Feed: VFC = () => {
  const { currentUser } = useAuthed();
  const { tweets, hasNext, loading, loadMore } = useFeed(currentUser.id);

  return (
    <Stack>
      {tweets.length && (
        <AppList>
          {tweets.map((tweet) => (
            <AppListItem key={tweet.id}>
              <TweetItem tweet={tweet} />
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

export const TweetsTab: VFC = () => {
  useSubscribeTweets();

  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Tabs onChange={setTabIndex}>
      <TabList>
        <Tab fontWeight="bold">Feed</Tab>
        <Tab fontWeight="bold">Tweets</Tab>
        <Tab fontWeight="bold">Likes</Tab>
      </TabList>
      <Feed />
    </Tabs>
  );
};
