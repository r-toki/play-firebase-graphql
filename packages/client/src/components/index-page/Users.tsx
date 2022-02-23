import { gql } from "@apollo/client";
import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import { VFC } from "react";

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
  const { data: usersData } = useUsersForIndexPageQuery();
  const { data: meData } = useMeForIndexPageQuery();
  const users = usersData?.users ?? [];
  const followings = meData?.me.followings ?? [];

  const [follow] = useFollowForIndexPageMutation();
  const [unFollow] = useUnFollowForIndexPageMutation();

  const toggleFollowButton = (userId: string) => {
    return followings.find((following) => following.id === userId) ? (
      <Button
        size="xs"
        onClick={unFollow.bind(null, { variables: { input: { followedId: userId } } })}
      >
        unfollow
      </Button>
    ) : (
      <Button
        size="xs"
        onClick={follow.bind(null, { variables: { input: { followedId: userId } } })}
      >
        follow
      </Button>
    );
  };

  return (
    <Stack>
      <Box alignSelf="center" fontWeight="bold">
        Users
      </Box>
      {users.length && (
        <AppList>
          {users.map((user) => (
            <AppListItem key={user.id}>
              <Flex justifyContent="space-between">
                <Box fontWeight="bold">{user.displayName}</Box>
                {toggleFollowButton(user.id)}
              </Flex>
            </AppListItem>
          ))}
        </AppList>
      )}
    </Stack>
  );
};
