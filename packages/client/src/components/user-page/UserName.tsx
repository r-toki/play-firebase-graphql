import { gql } from "@apollo/client";
import { Box } from "@chakra-ui/react";
import { VFC } from "react";

import { UserNameFragment } from "../../graphql/generated";

gql`
  fragment UserName on User {
    id
    displayName
  }
`;

type UserNameProps = {
  user: UserNameFragment;
};

export const UserName: VFC<UserNameProps> = ({ user }) => {
  return (
    <Box textAlign="center" fontWeight="bold" isTruncated>
      {user.displayName}
    </Box>
  );
};
