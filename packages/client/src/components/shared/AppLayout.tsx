import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { FC } from "react";

import { useAuth } from "../../context/Auth";
import { auth } from "../../firebase-app";
import { routes } from "../../routes";
import { AppLink } from "./AppLink";

const useAppLayout = () => {
  const { uid } = useAuth();

  const onLogout = () => {
    signOut(auth);
  };

  return { uid, onLogout };
};

export const AppLayout: FC = ({ children }) => {
  const { uid, onLogout } = useAppLayout();

  return (
    <Stack minH="100vh">
      <Box h="16" borderBottomWidth="1px" boxShadow="sm">
        <Container w="container.lg" maxW="container.lg" h="full">
          <Flex h="full" justifyContent="space-between" alignItems="center">
            <Heading>
              <AppLink to={routes["/"].path()}>App</AppLink>
            </Heading>
            {uid ? (
              <Box>
                <Menu placement="bottom-end">
                  <MenuButton as={Avatar} cursor="pointer" />
                  <MenuList>
                    <AppLink to={routes["/users/:user_id/edit"].path({ user_id: uid })}>
                      <MenuItem>Edit Profile</MenuItem>
                    </AppLink>
                    <MenuItem onClick={onLogout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </Box>
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
