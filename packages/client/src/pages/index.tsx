import { Box, Flex, Stack } from "@chakra-ui/react";
import { VFC } from "react";

import { News } from "../components/index-page/News";
import { TweetForm } from "../components/index-page/TweetForm";
import { TweetsPanel } from "../components/index-page/TweetsPanel";
import { UserMenu } from "../components/index-page/UserMenu";
import { Users } from "../components/index-page/Users";
import { AppLayout } from "../components/shared/AppLayout";

export const Index: VFC = () => {
  const main = (
    <Stack maxW="100%" w="xl" px="4" py="4" spacing="6">
      <TweetForm />
      <TweetsPanel />
    </Stack>
  );

  const left = (
    <Flex
      maxW="100%"
      w="xs"
      h="full"
      px="4"
      py="4"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box flexGrow="1" position="relative">
        <Box position="absolute" inset="0">
          <Users />
        </Box>
      </Box>
      <UserMenu />
    </Flex>
  );

  const right = (
    <Box maxW="100%" w="xs" px="4" py="4">
      <News />
    </Box>
  );

  return <AppLayout main={main} left={left} right={right} />;
};
