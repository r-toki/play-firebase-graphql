import { Box, Button, Center, Container, Flex, Heading, HStack, Stack } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { FC } from "react";

import { useAuth } from "../../context/Auth";
import { auth } from "../../firebase-app";
import { routes } from "../../routes";
import { AppLink } from "./AppLink";

export const AppLayout: FC = ({ children }) => {
  const { uid } = useAuth();

  const onLogout = () => {
    signOut(auth);
  };

  return (
    <Stack>
      <Box h="16" borderBottomWidth="1px" boxShadow="sm">
        <Container w="container.lg" maxW="container.lg" h="full">
          <Flex h="full" justifyContent="space-between" alignItems="center">
            <Heading>
              <AppLink to={routes["/"].path()}>App</AppLink>
            </Heading>
            {uid ? (
              <HStack>
                <Button>
                  <AppLink to={routes["/users/:user_id/edit"].path({ user_id: uid })}>
                    Edit Profile
                  </AppLink>
                </Button>
                <Button onClick={onLogout}>Logout</Button>
              </HStack>
            ) : (
              <Button>
                <AppLink to={routes["/login"].path()}>Login</AppLink>
              </Button>
            )}
          </Flex>
        </Container>
      </Box>
      <Center>{children}</Center>
    </Stack>
  );
};
