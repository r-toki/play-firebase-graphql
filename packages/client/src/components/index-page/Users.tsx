import { gql } from "@apollo/client";
import { Box, Stack } from "@chakra-ui/react";
import { VFC } from "react";

import { useUsersForIndexPageQuery } from "../../graphql/generated";

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
      <Box borderWidth="1px" rounded="md">
        {users.map((user) => (
          <Box
            key={user.id}
            px="3"
            py="2"
            borderBottomWidth="1px"
            _last={{ borderBottomWidth: "0" }}
          >
            <Box fontWeight="bold">{user.displayName}</Box>
          </Box>
        ))}
      </Box>
    </Stack>
  );
};
