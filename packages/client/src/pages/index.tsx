import { Container } from "@chakra-ui/react";
import { VFC } from "react";

import { AuthView } from "../components/index/AuthView";

export const Index: VFC = () => {
  return (
    <Container maxW="container.md">
      <AuthView />
    </Container>
  );
};
