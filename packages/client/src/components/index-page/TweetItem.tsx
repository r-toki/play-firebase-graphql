import { gql } from "@apollo/client";
import { DeleteIcon, EditIcon, StarIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, HStack, Stack, Textarea, VStack } from "@chakra-ui/react";
import { format } from "date-fns";
import { useState, VFC } from "react";

import { useAuthed } from "../../context/Authed";
import {
  TweetItemFragment,
  useDeleteTweetMutation,
  useLikeMutation,
  useUnLikeMutation,
  useUpdateTweetMutation,
} from "../../graphql/generated";
import { useTextInput } from "../../hooks/useTextInput";

gql`
  fragment tweetItem on Tweet {
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
    }
  }

  mutation updateTweet($id: ID!, $input: UpdateTweetInput!) {
    updateTweet(id: $id, input: $input) {
      id
      ...tweetItem
    }
  }

  mutation like($tweetId: ID!) {
    like(tweetId: $tweetId) {
      id
      ...tweetItem
    }
  }

  mutation unLike($tweetId: ID!) {
    unLike(tweetId: $tweetId) {
      id
      ...tweetItem
    }
  }
`;

type TweetItemProps = { tweet: TweetItemFragment };

export const TweetItem: VFC<TweetItemProps> = ({ tweet }) => {
  const { currentUser } = useAuthed();

  const [deleteTweet] = useDeleteTweetMutation();
  const [updateTweet] = useUpdateTweetMutation();

  const [like] = useLikeMutation();
  const [unLike] = useUnLikeMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [contentInput] = useTextInput(tweet.content);

  const onUpdate = async () => {
    await updateTweet({ variables: { id: tweet.id, input: { content: contentInput.value } } });
    setIsEditing(false);
  };

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
