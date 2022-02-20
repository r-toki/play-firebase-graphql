import { gql } from "@apollo/client";
import { Box, Stack } from "@chakra-ui/react";
import { VFC } from "react";

import { useUsersForIndexPageQuery } from "../../graphql/generated";
import { AppList, AppListItem } from "../shared/AppList";

gql`
  query usersForIndexPage {
    users {
      id
      displayName
    }
  }
`;

const useUsers = () => {
  const { data } = useUsersForIndexPageQuery();
  const users = data?.users ?? [];

  return { users };
};

export const Users: VFC = () => {
  const { users } = useUsers();

  return (
    <Stack>
      <Box alignSelf="center" fontWeight="bold">
        Users
      </Box>
      <AppList>
        {users.map((user) => (
          <AppListItem key={user.id}>
            <Box fontWeight="bold">{user.displayName}</Box>
          </AppListItem>
        ))}
      </AppList>
    </Stack>
  );
};
