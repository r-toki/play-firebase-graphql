import { Center, Spinner, Stack, Tab, TabList, Tabs } from "@chakra-ui/react";
import { useState, VFC } from "react";

import { useAuthed } from "../../context/Authed";
import { Tweet_Filter, TweetItemFragment } from "../../graphql/generated";
import { useTweets } from "../../hooks/useTweets";
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

export const TweetsTab: VFC = () => {
  // TODO: user_id param に合わせる
  const { currentUser } = useAuthed();

  const [tabIndex, setTabIndex] = useState(0);

  const filterMaps: { [key: number]: Tweet_Filter[] } = {
    0: ["SELF", "FOLLOWINGS", "LIKES"],
    1: ["SELF", "LIKES"],
    2: ["LIKES"],
  };

  const useTweetsReturn = useTweets(currentUser.id, filterMaps[tabIndex]);

  return (
    <Tabs onChange={setTabIndex}>
      <TabList>
        <Tab fontWeight="bold">Feed</Tab>
        <Tab fontWeight="bold">Tweets</Tab>
        <Tab fontWeight="bold">Likes</Tab>
      </TabList>
      <Tweets {...useTweetsReturn} />
    </Tabs>
  );
};
