import { Center, Spinner, Stack, Tab, TabList, Tabs } from "@chakra-ui/react";
import { useState, VFC } from "react";

import { useAuthed } from "../../context/Authed";
import { useFavoriteTweets, useFeed, useTweets } from "../../hooks/useTweets";
import { useTweetsSubscription } from "../../hooks/useTweetsSubscription";
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

const Tweets: VFC = () => {
  const { currentUser } = useAuthed();
  const { tweets, hasNext, loading, loadMore } = useTweets(currentUser.id);

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

const Likes: VFC = () => {
  const { currentUser } = useAuthed();
  const { tweets, hasNext, loading, loadMore } = useFavoriteTweets(currentUser.id);

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
  // TODO: user_id param に合わせる
  const { currentUser } = useAuthed();
  useTweetsSubscription(currentUser.id);

  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Tabs onChange={setTabIndex}>
      <TabList>
        <Tab fontWeight="bold">Feed</Tab>
        <Tab fontWeight="bold">Tweets</Tab>
        <Tab fontWeight="bold">Likes</Tab>
      </TabList>
      {tabIndex === 0 && <Feed />}
      {tabIndex === 1 && <Tweets />}
      {tabIndex === 2 && <Likes />}
    </Tabs>
  );
};
