import { Center, Spinner, Stack, Tab, TabList, Tabs } from "@chakra-ui/react";
import { useEffect, useState, VFC } from "react";

import { useAuthed } from "../../context/Authed";
import { Tweet_Filter, TweetItemFragment } from "../../graphql/generated";
import { useTweets } from "../../hooks/useTweets";
import { useTweetsSubscription } from "../../hooks/useTweetsSubscription";
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

export const TweetsPanel: VFC = () => {
  // TODO: user_id param に合わせる
  const { currentUser } = useAuthed();

  const [tabIndex, setTabIndex] = useState(0);

  const filterMaps: { [key: number]: Tweet_Filter[] } = {
    // NOTE: Feed
    0: ["SELF", "FOLLOWINGS"],

    // NOTE: Tweets
    1: ["SELF"],

    // NOTE: Likes
    2: ["LIKES"],
  };

  const { tweets, hasNext, loading, loadMore, fetch } = useTweets(
    currentUser.id,
    filterMaps[tabIndex]
  );

  useEffect(() => {
    fetch();
  }, [tabIndex]);

  useTweetsSubscription(currentUser.id);

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
