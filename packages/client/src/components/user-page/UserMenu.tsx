import { HamburgerIcon } from "@chakra-ui/icons";
import { Avatar, Box, Flex, HStack, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { VFC } from "react";
import { useNavigate } from "react-router-dom";

import { useCurrentUser } from "../../context/CurrentUser";
import { auth } from "../../firebase-app";
import { routes } from "../../routes";
import { AppLink } from "../shared/AppLink";

const useUserMenu = () => {
  const navigate = useNavigate();

  const currentUser = useCurrentUser();

  const onClickEditProfile = () =>
    navigate(routes["/users/:user_id/edit"].path({ user_id: currentUser.id }));

  const onClickLogout = () => signOut(auth);

  return { currentUser, onClickEditProfile, onClickLogout };
};

export const UserMenu: VFC = () => {
  const { currentUser, onClickEditProfile, onClickLogout } = useUserMenu();

  return (
    <Box>
      <Menu>
        <MenuButton
          w="100%"
          px="3"
          py="2"
          borderWidth="1px"
          rounded="md"
          _hover={{ bg: "gray.100" }}
        >
          <Flex justifyContent="space-between" alignItems="center">
            <HStack spacing="4">
              <Avatar />
              <Box fontWeight="bold">{currentUser.displayName}</Box>
            </HStack>
            <HamburgerIcon />
          </Flex>
        </MenuButton>
        <MenuList>
          <AppLink to={routes["/"].path()}>
            <MenuItem>Home</MenuItem>
          </AppLink>
          <MenuItem onClick={onClickEditProfile}>Edit Profile</MenuItem>
          <MenuItem onClick={onClickLogout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};
