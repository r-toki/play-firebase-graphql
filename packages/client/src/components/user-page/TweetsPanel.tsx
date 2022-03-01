import { Center, Spinner, Stack, Tab, TabList, Tabs } from "@chakra-ui/react";
import { useEffect, useState, VFC } from "react";
import { useParams } from "react-router-dom";

import { useCurrentUser } from "../../context/CurrentUser";
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
  const { user_id } = useParams();
  const currentUser = useCurrentUser();
  const isMyPage = user_id === currentUser.id;

  const [tabIndex, setTabIndex] = useState(0);

  const filterMaps: { [key: number]: Tweet_Filter[] } = isMyPage
    ? {
        // NOTE: Feed
        0: ["SELF", "FOLLOWINGS"],

        // NOTE: Tweets
        1: ["SELF"],

        // NOTE: Likes
        2: ["LIKES"],
      }
    : {
        // NOTE: Tweets
        0: ["SELF"],

        // NOTE: Likes
        1: ["LIKES"],
      };

  const { tweets, hasNext, loading, loadMore, fetch } = useTweets(user_id!, filterMaps[tabIndex]);

  useEffect(() => {
    fetch();
  }, [tabIndex]);

  useTweetsSubscription(user_id!);

  return (
    <Tabs onChange={setTabIndex}>
      <TabList>
        {isMyPage && <Tab fontWeight="bold">Feed</Tab>}
        <Tab fontWeight="bold">Tweets</Tab>
        <Tab fontWeight="bold">Likes</Tab>
      </TabList>
      <Tweets {...{ tweets, hasNext, loading, loadMore }} />
    </Tabs>
  );
};
