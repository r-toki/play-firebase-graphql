import { Box, Container, HStack, Stack } from "@chakra-ui/react";
import { VFC } from "react";

import { News } from "../components/index-page/News";
import { TweetForm } from "../components/index-page/TweetForm";
import { Tweets } from "../components/index-page/Tweets";
import { Users } from "../components/index-page/Users";

export const Index: VFC = () => {
  return (
    <Container maxW="container.xl">
      <HStack justifyContent="center" alignItems="start" spacing="16">
        <Box w="xs">
          <Users />
        </Box>
        <Stack w="md" spacing="6">
          <TweetForm />
          <Tweets />
        </Stack>
        <Box w="xs">
          <News />
        </Box>
      </HStack>
    </Container>
  );
};
