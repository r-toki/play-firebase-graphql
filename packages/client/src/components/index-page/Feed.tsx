import { gql, useApolloClient } from "@apollo/client";
import { DeleteIcon, EditIcon, StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Spinner,
  Stack,
  Tab,
  TabList,
  Tabs,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { orderBy } from "lodash-es";
import { useState, VFC } from "react";

import { useAuthed } from "../../context/Authed";
import {
  FavoriteTweetsDocument,
  FeedItemFragment,
  useDeleteTweetMutation,
  useLikeMutation,
  useUnLikeMutation,
  useUpdateTweetMutation,
} from "../../graphql/generated";
import { useFavoriteTweets, useFeed, useSubscribeTweets } from "../../hooks/useFeed";
import { useTextInput } from "../../hooks/useTextInput";
import { AppList, AppListItem } from "../shared/AppList";
import { MoreSpinner } from "../shared/AppMoreSpinner";

gql`
  fragment feedItem on Tweet {
    id
    content
    createdAt
    creator {
      id
      displayName
    }
    favorite
  }

  mutation deleteTweet($id: ID!) {
    deleteTweet(id: $id) {
      id
      tweets {
        id
        ...feedItem
      }
    }
  }

  mutation updateTweet($id: ID!, $input: UpdateTweetInput!) {
    updateTweet(id: $id, input: $input) {
      id
      ...feedItem
    }
  }

  mutation like($tweetId: ID!) {
    like(tweetId: $tweetId) {
      node {
        id
        ...feedItem
      }
      cursor
    }
  }

  mutation unLike($tweetId: ID!) {
    unLike(tweetId: $tweetId) {
      node {
        id
        ...feedItem
      }
      cursor
    }
  }
`;

type FeedItemProps = { tweet: FeedItemFragment };

export const FeedItem: VFC<FeedItemProps> = ({ tweet }) => {
  const { currentUser } = useAuthed();

  const [deleteTweet] = useDeleteTweetMutation();
  const [updateTweet] = useUpdateTweetMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [contentInput] = useTextInput(tweet.content);

  const onUpdate = async () => {
    await updateTweet({ variables: { id: tweet.id, input: { content: contentInput.value } } });
    setIsEditing(false);
  };

  const [like] = useLikeMutation({
    update(cache, result) {
      cache.updateQuery({ query: FavoriteTweetsDocument, overwrite: true }, (data) => {
        if (!data) return data;
        if (!result.data) return data;
        return {
          ...data,
          favoriteTweets: {
            ...data.favoriteTweets,
            edges: orderBy(
              [...data.favoriteTweets.edges, result.data.like],
              (v) => v.cursor,
              "desc"
            ),
          },
        };
      });
    },
  });

  const [unLike] = useUnLikeMutation({
    update(cache, result) {
      cache.updateQuery({ query: FavoriteTweetsDocument, overwrite: true }, (data) => {
        if (!data) return data;
        if (!result.data) return data;
        return {
          ...data,
          favoriteTweets: {
            ...data.favoriteTweets,
            edges: [...data.favoriteTweets.edges].filter(
              // FIXME: なぜか partial になる
              (v) => v.node.id !== result.data!.unLike.node.id
            ),
          },
        };
      });
    },
  });

  return (
    <Stack>
      <Flex justifyContent="space-between">
        <HStack>
          <Box fontWeight="bold">{tweet.creator.displayName}</Box>
          <Box>{format(new Date(tweet.createdAt), "yyyy-MM-dd HH:mm")}</Box>
        </HStack>
        {tweet.creator.id === currentUser.id && (
          <HStack>
            <Button
              size="xs"
              onClick={() => {
                setIsEditing((prev) => !prev);
              }}
            >
              <EditIcon />
            </Button>

            <Button
              size="xs"
              onClick={() => {
                deleteTweet({ variables: { id: tweet.id } });
              }}
            >
              <DeleteIcon />
            </Button>
          </HStack>
        )}
      </Flex>

      {isEditing ? (
        <VStack my="2">
          <Textarea {...contentInput} rows={5} />
          <Button
            alignSelf="end"
            size="xs"
            onClick={() => {
              onUpdate();
            }}
          >
            update
          </Button>
        </VStack>
      ) : (
        <Box>{tweet.content}</Box>
      )}

      <Box>
        {tweet.favorite ? (
          <Button
            variant="outline"
            size="xs"
            onClick={() => {
              unLike({ variables: { tweetId: tweet.id } });
            }}
          >
            <StarIcon color="yellow.400" />
          </Button>
        ) : (
          <Button
            variant="outline"
            size="xs"
            onClick={() => {
              like({ variables: { tweetId: tweet.id } });
            }}
          >
            <StarIcon color="gray.400" />
          </Button>
        )}
      </Box>
    </Stack>
  );
};

const Tweets: VFC = () => {
  const { tweets, hasNext, loading, loadMore } = useFeed();

  return (
    <Stack>
      {tweets.length && (
        <AppList>
          {tweets.map((tweet) => (
            <AppListItem key={tweet.id}>
              <FeedItem tweet={tweet} />
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
  const { tweets, hasNext, loading, loadMore } = useFavoriteTweets();

  return (
    <Stack>
      {tweets.length && (
        <AppList>
          {tweets.map((tweet) => (
            <AppListItem key={tweet.id}>
              <FeedItem tweet={tweet} />
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

export const Feed: VFC = () => {
  useSubscribeTweets();

  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Tabs onChange={setTabIndex}>
      <TabList>
        <Tab fontWeight="bold">Tweets</Tab>
        <Tab fontWeight="bold">Likes</Tab>
      </TabList>
      {tabIndex === 0 ? <Tweets /> : tabIndex === 1 ? <Likes /> : null}
    </Tabs>
  );
};
