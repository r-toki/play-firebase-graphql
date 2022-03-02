import { gql } from "@apollo/client";
import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import { VFC } from "react";

import { useCurrentUser } from "../../context/CurrentUser";
import {
  MeForUsersFragment,
  useFollowMutation,
  UserForUsersFragment,
  useUnFollowMutation,
} from "../../graphql/generated";
import { routes } from "../../routes";
import { AppLink } from "../shared/AppLink";
import { AppList, AppListItem } from "../shared/AppList";

gql`
  mutation Follow($userId: ID!) {
    follow(userId: $userId) {
      id
      followings {
        id
        ...UserForUsers
      }
    }
  }

  mutation UnFollow($userId: ID!) {
    unFollow(userId: $userId) {
      id
      followings {
        id
        ...UserForUsers
      }
    }
  }
`;

gql`
  fragment UserForUsers on User {
    id
    displayName
  }

  fragment MeForUsers on User {
    id
    followings {
      id
      ...UserForUsers
    }
  }
`;

type UsersProps = {
  users: UserForUsersFragment[];
  me: MeForUsersFragment;
};

export const Users: VFC<UsersProps> = ({ users, me }) => {
  const currentUser = useCurrentUser();

  const otherUsers = users.filter((user) => user.id !== currentUser.id);
  const followings = me.followings;

  const [follow] = useFollowMutation();
  const [unFollow] = useUnFollowMutation();

  const ToggleFollowButton: VFC<{ userId: string }> = ({ userId }) => {
    return followings.find((following) => following.id === userId) ? (
      <Button size="xs" onClick={() => unFollow({ variables: { userId } })}>
        unfollow
      </Button>
    ) : (
      <Button size="xs" onClick={() => follow({ variables: { userId } })}>
        follow
      </Button>
    );
  };

  return (
    <Stack h="full">
      <Box alignSelf="center" fontWeight="bold">
        Users
      </Box>
      <Box overflow="auto">
        {otherUsers.length && (
          <AppList>
            {otherUsers.map((user) => (
              <AppListItem key={user.id}>
                <Flex justifyContent="space-between">
                  <AppLink to={routes["/users/:user_id"].path({ user_id: user.id })}>
                    <Box fontWeight="bold" isTruncated>
                      {user.displayName}
                    </Box>
                  </AppLink>
                  <ToggleFollowButton userId={user.id} />
                </Flex>
              </AppListItem>
            ))}
          </AppList>
        )}
      </Box>
    </Stack>
  );
};
