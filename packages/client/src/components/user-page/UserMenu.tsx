import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
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
    <Flex justifyContent="space-between" px="3" py="2" borderWidth="1px" rounded="md">
      <HStack flex="1">
        <Avatar />
        <AppLink to={routes["/"].path()} flex="1">
          <Box fontWeight="bold" noOfLines={1}>
            {currentUser.displayName}
          </Box>
        </AppLink>
      </HStack>

      <Box>
        <Menu placement="top-end">
          <MenuButton as={Button}>
            <HamburgerIcon />
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
    </Flex>
  );
};
