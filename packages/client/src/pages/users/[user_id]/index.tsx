import { gql } from "@apollo/client";
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
import {
  useMeForUserPageQuery,
  useUserForUserPageQuery,
  useUsersForUserPageQuery,
} from "../../../graphql/generated";

const useUserPageContainer = () => {
  const { user_id: _user_id } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user_id = _user_id!;
  const currentUser = useCurrentUser();
  const isMyPage = user_id === currentUser.id;
  return { user_id, isMyPage };
};

const userPageContainer = createContainer(useUserPageContainer);
const UserPageProvider = userPageContainer.Provider;
export const useUserPageContext = userPageContainer.useContainer;

gql`
  query UserForUserPage($id: ID!) {
    user(id: $id) {
      id
      ...UserName
    }
  }

  query UsersForUserPage {
    users {
      id
      ...UserForUsers
    }
  }

  query MeForUserPage {
    me {
      id
      ...MeForUsers
    }
  }
`;

const _UserPage: VFC = () => {
  const { user_id, isMyPage } = useUserPageContext();

  const { data: userData } = useUserForUserPageQuery({ variables: { id: user_id } });
  const { data: usersData } = useUsersForUserPageQuery();
  const { data: meData } = useMeForUserPageQuery();

  const main = (
    <Stack maxW="100%" w="xl" px="4" py="4">
      {userData && <UserName user={userData.user} />}
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
          {usersData && meData && <Users users={usersData.users} me={meData.me} />}
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
