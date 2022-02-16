import { gql } from "@apollo/client";
import { Container } from "@chakra-ui/react";
import { VFC } from "react";

import { AuthView } from "../components/index/AuthView";

gql`
  query allUsers {
    users {
      ...userForIndexPage
    }
  }

  fragment userForIndexPage on User {
    id
    displayName
  }
`;

export const Index: VFC = () => {
  return (
    <Container maxW="container.md">
      <AuthView />
    </Container>
  );
};
