import { Center, Spinner, Stack, Tab, TabList, Tabs } from "@chakra-ui/react";
import { useEffect, useState, VFC } from "react";

import { Tweet_Filter, TweetItemFragment } from "../../graphql/generated";
import { useTweets } from "../../hooks/useTweets";
import { useTweetsSubscription } from "../../hooks/useTweetsSubscription";
import { useUserPageContext } from "../../pages/users/[user_id]";
import { AppList, AppListItem } from "../shared/AppList";
import { MoreSpinner } from "../shared/AppMoreSpinner";
import { TweetItem } from "./TweetItem";

type TweetsProps = {
  tweets: TweetItemFragment[];
  loading: boolean;
  hasNext: boolean;
  loadMore: () => void;
};

const Tweets: VFC<TweetsProps> = ({ tweets, loading, hasNext, loadMore }) => {
  return (
    <Stack>
      {tweets.length && (
        <AppList>
          {tweets.map((tweet) => (
            <AppListItem key={tweet.id}>
              <TweetItem tweet={tweet} />
            </AppListItem>
          ))}
        </AppList>
      )}
      {loading ? (
        <Center my="4">
          <Spinner />
        </Center>
      ) : hasNext ? (
        <Center my="4">
          <MoreSpinner cb={loadMore} />
        </Center>
      ) : null}
    </Stack>
  );
};

const MyTweetsPanel: VFC = () => {
  const { user_id } = useUserPageContext();

  const [tabIndex, setTabIndex] = useState(0);
  const filterMaps: { [key: number]: Tweet_Filter[] } = {
    // NOTE: Feed
    0: ["SELF", "FOLLOWINGS"],

    // NOTE: Tweets
    1: ["SELF"],

    // NOTE: Likes
    2: ["LIKES"],
  };

  const { tweets, hasNext, loading, loadMore, fetch } = useTweets(user_id, filterMaps[tabIndex]);
  useEffect(() => {
    fetch();
  }, [tabIndex]);

  useTweetsSubscription(user_id, filterMaps[tabIndex]);

  return (
    <Tabs onChange={setTabIndex}>
      <TabList>
        <Tab fontWeight="bold">Feed</Tab>
        <Tab fontWeight="bold">Tweets</Tab>
        <Tab fontWeight="bold">Likes</Tab>
      </TabList>
      <Tweets {...{ tweets, hasNext, loading, loadMore }} />
    </Tabs>
  );
};

const OtherTweetsPanel: VFC = () => {
  const { user_id } = useUserPageContext();

  const [tabIndex, setTabIndex] = useState(0);
  const filterMaps: { [key: number]: Tweet_Filter[] } = {
    // NOTE: Tweets
    0: ["SELF"],

    // NOTE: Likes
    1: ["LIKES"],
  };

  const { tweets, hasNext, loading, loadMore, fetch } = useTweets(user_id, filterMaps[tabIndex]);
  useEffect(() => {
    fetch();
  }, [tabIndex]);

  useTweetsSubscription(user_id, filterMaps[tabIndex]);

  return (
    <Tabs onChange={setTabIndex}>
      <TabList>
        <Tab fontWeight="bold">Tweets</Tab>
        <Tab fontWeight="bold">Likes</Tab>
      </TabList>
      <Tweets {...{ tweets, hasNext, loading, loadMore }} />
    </Tabs>
  );
};

export const TweetsPanel: VFC = () => {
  const { isMyPage } = useUserPageContext();
  return isMyPage ? <MyTweetsPanel /> : <OtherTweetsPanel />;
};
