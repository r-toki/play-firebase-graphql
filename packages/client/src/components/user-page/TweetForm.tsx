import { gql } from "@apollo/client";
import { Button, Stack, Textarea } from "@chakra-ui/react";
import { FormEventHandler, VFC } from "react";

import { useCreateTweetMutation } from "../../graphql/generated";
import { useTextInput } from "../../hooks/useTextInput";

gql`
  mutation CreateTweet($input: CreateTweetInput!) {
    createTweet(input: $input) {
      id
      ...TweetItem
    }
  }
`;

const useTweetForm = () => {
  const [createTweet] = useCreateTweetMutation();
  const [tweetContentInput, resetTweetContentInput] = useTextInput();

  const onCreateTweet: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await createTweet({ variables: { input: { content: tweetContentInput.value } } });
    resetTweetContentInput();
  };

  return {
    tweetContentInput,
    onCreateTweet,
  };
};

export const TweetForm: VFC = () => {
  const { tweetContentInput, onCreateTweet } = useTweetForm();

  return (
    <form onSubmit={onCreateTweet}>
      <Stack>
        <Textarea {...tweetContentInput} required rows={5} />
        <Button type="submit">Post</Button>
      </Stack>
    </form>
  );
};
