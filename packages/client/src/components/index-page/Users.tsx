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

  mutation followForIndexPage($input: FollowInput!) {
    follow(input: $input) {
      id
      followings {
        id
        displayName
      }
    }
  }

  mutation unFollowForIndexPage($input: UnFollowInput!) {
    unFollow(input: $input) {
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
      <Button size="xs" onClick={() => unFollow({ variables: { input: { followedId: userId } } })}>
        unfollow
      </Button>
    ) : (
      <Button size="xs" onClick={() => follow({ variables: { input: { followedId: userId } } })}>
        follow
      </Button>
    );
  };

  return (
    <Stack>
      <Box alignSelf="center" fontWeight="bold">
        Users
      </Box>
      {otherUsers.length && (
        <AppList>
          {otherUsers.map((user) => (
            <AppListItem key={user.id}>
              <Flex justifyContent="space-between">
                <Box fontWeight="bold">{user.displayName}</Box>
                <ToggleFollowButton userId={user.id} />
              </Flex>
            </AppListItem>
          ))}
        </AppList>
      )}
    </Stack>
  );
};
