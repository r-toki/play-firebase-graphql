import { gql } from "@apollo/client";
import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import { VFC } from "react";

import { useAuthed } from "../../context/Authed";
import {
  useFollowForIndexPageMutation,
  useMeForIndexPageQuery,
  useUnFollowForIndexPageMutation,
  useUsersForIndexPageQuery,
} from "../../graphql/generated";
import { routes } from "../../routes";
import { AppLink } from "../shared/AppLink";
import { AppList, AppListItem } from "../shared/AppList";

gql`
  query usersForIndexPage {
    users {
      id
      displayName
    }
  }

  query meForIndexPage {
    me {
      id
      followings {
        id
        displayName
      }
    }
  }

  mutation followForIndexPage($userId: ID!) {
    follow(userId: $userId) {
      id
      followings {
        id
        displayName
      }
    }
  }

  mutation unFollowForIndexPage($userId: ID!) {
    unFollow(userId: $userId) {
      id
      followings {
        id
        displayName
      }
    }
  }
`;

export const Users: VFC = () => {
  const { currentUser } = useAuthed();
  const { data: usersData } = useUsersForIndexPageQuery();
  const { data: meData } = useMeForIndexPageQuery();
  const otherUsers = usersData?.users.filter((user) => user.id !== currentUser.id) ?? [];
  const followings = meData?.me.followings ?? [];

  const [follow] = useFollowForIndexPageMutation();
  const [unFollow] = useUnFollowForIndexPageMutation();

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
