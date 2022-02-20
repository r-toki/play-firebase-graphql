import { HamburgerIcon } from "@chakra-ui/icons";
import { Avatar, Box, Flex, HStack, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { VFC } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthed } from "../../context/Authed";
import { auth } from "../../firebase-app";
import { routes } from "../../routes";

const useUserMenu = () => {
  const { currentUser } = useAuthed();
  const navigate = useNavigate();

  const onEditProfile = () =>
    navigate(routes["/users/:user_id/edit"].path({ user_id: currentUser.id }));
  const onLogout = () => signOut(auth);

  return { onEditProfile, onLogout };
};

export const UserMenu: VFC = () => {
  const { onEditProfile, onLogout } = useUserMenu();

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
              <Box fontWeight="bold">MyString</Box>
            </HStack>
            <HamburgerIcon />
          </Flex>
        </MenuButton>
        <MenuList>
          <MenuItem onClick={onEditProfile}>Edit Profile</MenuItem>
          <MenuItem onClick={onLogout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};
