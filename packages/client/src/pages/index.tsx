import { gql } from "@apollo/client";
import { Container } from "@chakra-ui/react";
import { VFC } from "react";

import { AuthView } from "../components/index/AuthView";

gql`
  query hello {
    hello
  }
`;

export const Index: VFC = () => {
  return (
    <Container maxW="container.md">
      <AuthView />
    </Container>
  );
};
