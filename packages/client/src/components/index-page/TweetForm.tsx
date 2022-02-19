import { Box, Button, Stack, Textarea } from "@chakra-ui/react";
import { addDoc, Timestamp } from "firebase/firestore";
import { FormEventHandler, VFC } from "react";

import { db } from "../../firebase-app";
import { useAuthed } from "../../hooks/useAuthed";
import { useTextInput } from "../../hooks/useTextInput";
import { userTweetsRef } from "../../lib/typed-ref";

const useTweetForm = () => {
  const { uid } = useAuthed();

  const tweetContentInput = useTextInput();

  const onCreateTweet: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addDoc(userTweetsRef(db, { userId: uid }), {
      content: tweetContentInput.value,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      creatorId: uid,
    });
    tweetContentInput.reset();
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
          <Textarea
            value={tweetContentInput.value}
            onChange={tweetContentInput.onChange}
            required
          />
          <Button type="submit">Post</Button>
        </Stack>
      </form>
    </Stack>
  );
};
