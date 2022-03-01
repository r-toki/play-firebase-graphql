import { gql } from "@apollo/client";
import { Box } from "@chakra-ui/react";
import { VFC } from "react";
import { useParams } from "react-router-dom";

import { useUserQuery } from "../../graphql/generated";

gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      displayName
    }
  }
`;

export const User: VFC = () => {
  const { user_id } = useParams();
  const { data } = useUserQuery({ variables: { id: user_id! } });
  return (
    <Box textAlign="center" fontWeight="bold">
      {data?.user.displayName ?? "---"}
    </Box>
  );
};
