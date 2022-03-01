import { Box, Flex, Stack } from "@chakra-ui/react";
import { VFC } from "react";
import { useParams } from "react-router-dom";
import { createContainer } from "unstated-next";

import { AppLayout } from "../../../components/shared/AppLayout";
import { News } from "../../../components/user-page/News";
import { TweetForm } from "../../../components/user-page/TweetForm";
import { TweetsPanel } from "../../../components/user-page/TweetsPanel";
import { UserMenu } from "../../../components/user-page/UserMenu";
import { UserName } from "../../../components/user-page/UserName";
import { Users } from "../../../components/user-page/Users";
import { useCurrentUser } from "../../../context/CurrentUser";
import { assertIsDefined } from "../../../lib/type-utils";

const useUserPageContainer = () => {
  const { user_id } = useParams();
  assertIsDefined(user_id);

  const currentUser = useCurrentUser();

  const isMyPage = user_id === currentUser.id;

  return { user_id, isMyPage };
};

const userPageContainer = createContainer(useUserPageContainer);
const UserPageProvider = userPageContainer.Provider;
export const useUserPageContext = userPageContainer.useContainer;

const _UserPage: VFC = () => {
  const { isMyPage } = useUserPageContext();

  const main = (
    <Stack maxW="100%" w="xl" px="4" py="4">
      <UserName />
      <Stack spacing="6">
        {isMyPage && <TweetForm />}
        <TweetsPanel />
      </Stack>
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

export const UserPage: VFC = () => (
  <UserPageProvider>
    <_UserPage />
  </UserPageProvider>
);
