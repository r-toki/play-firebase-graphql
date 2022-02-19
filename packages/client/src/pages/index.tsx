import { Center, Container, Stack } from "@chakra-ui/react";
import { VFC } from "react";

import { TweetForm } from "../components/index-page/TweetForm";
import { Tweets } from "../components/index-page/Tweets";

export const Index: VFC = () => {
  return (
    <Container maxW="container.xl">
      <Center>
        <Stack w="md" spacing="6">
          <TweetForm />
          <Tweets />
        </Stack>
      </Center>
    </Container>
  );
};
