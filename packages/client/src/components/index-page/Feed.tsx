import { gql } from "@apollo/client";
import { DeleteIcon, EditIcon, StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Spinner,
  Stack,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useState, VFC } from "react";

import { useAuthed } from "../../context/Authed";
import {
  FeedItemFragment,
  useDeleteTweetMutation,
  useUpdateTweetMutation,
} from "../../graphql/generated";
import { useFeed, useSubscribeFeed } from "../../hooks/useFeed";
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

  return (
    <Box>
      <Flex justifyContent="space-between">
        <HStack>
          <Box fontWeight="bold">{tweet.creator.displayName}</Box>
          <Box>{format(new Date(tweet.createdAt), "yyyy-MM-dd HH:mm")}</Box>
        </HStack>
        {tweet.creator.id === currentUser.id ? (
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
        ) : (
          <HStack>
            <Button variant="outline" size="xs">
              <StarIcon color="yellow.400" />
            </Button>
            <Button variant="outline" size="xs">
              <StarIcon color="gray.400" />
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
    </Box>
  );
};

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
