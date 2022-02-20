import { Box, Button, Stack, Textarea } from "@chakra-ui/react";
import { addDoc, Timestamp } from "firebase/firestore";
import { FormEventHandler, VFC } from "react";

import { useAuthed } from "../../context/Authed";
import { db } from "../../firebase-app";
import { useTextInput } from "../../hooks/useTextInput";
import { userTweetsRef } from "../../lib/typed-ref";

const useTweetForm = () => {
  const { currentUser } = useAuthed();

  const [tweetContentInput, resetTweetContentInput] = useTextInput();

  const onCreateTweet: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addDoc(userTweetsRef(db, { userId: currentUser.id }), {
      content: tweetContentInput.value,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      creatorId: currentUser.id,
    });
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
    <Stack>
      <Box alignSelf="center" fontWeight="bold">
        Tweet Form
      </Box>
      <form onSubmit={onCreateTweet}>
        <Stack>
          <Textarea {...tweetContentInput} required rows={5} />
          <Button type="submit">Post</Button>
        </Stack>
      </form>
    </Stack>
  );
};
