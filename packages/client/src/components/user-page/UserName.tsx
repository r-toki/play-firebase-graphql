import { gql } from "@apollo/client";
import { Box } from "@chakra-ui/react";
import { VFC } from "react";

import { useUserForUserNameQuery } from "../../graphql/generated";
import { assertIsDefined } from "../../lib/type-utils";
import { useUserPageContext } from "../../pages/users/[user_id]";

gql`
  query userForUserName($id: ID!) {
    user(id: $id) {
      id
      displayName
    }
  }
`;

export const UserName: VFC = () => {
  const { user_id } = useUserPageContext();
  const { data, loading } = useUserForUserNameQuery({ variables: { id: user_id } });
  if (loading) return null;
  assertIsDefined(data);
  return (
    <Box textAlign="center" fontWeight="bold">
      {data.user.displayName}
    </Box>
  );
};
