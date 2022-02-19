import { gql } from "@apollo/client";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Stack,
  Table,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { pathBuilder } from "@rei-sogawa/path-builder";
import { UserTweetsPath } from "common/web";
import { addDoc, Timestamp } from "firebase/firestore";
import { FormEventHandler, useEffect, VFC } from "react";

import { db } from "../firebaseApp";
import { useAllUsersQuery } from "../graphql/generated";
import { useAuthed } from "../hooks/useAuthed";
import { useTextInput } from "../hooks/useTextInput";
import { usersRef, userTweetsRef } from "../lib/typed-ref";

gql`
  query allUsers {
    users {
      id
      displayName
      tweets {
        id
        content
        creator {
          tweets {
            creator {
              id
            }
          }
        }
      }
    }
  }
`;

export const Index: VFC = () => {
  const { uid } = useAuthed();

  useEffect(() => {
    console.log(usersRef(db));
    console.log(userTweetsRef(db, { userId: uid }));
  }, []);

  const allUsersQuery = useAllUsersQuery();
  const users = allUsersQuery.data?.users ?? [];
  const tweets = allUsersQuery.data?.users.flatMap((v) => v.tweets) ?? [];

  const tweetContentInput = useTextInput();

  const onCreateTweet: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addDoc(userTweetsRef(db, { userId: uid }), {
      content: tweetContentInput.value,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      creatorId: uid,
    });
    tweetContentInput.reset();
  };

  return (
    <Container maxW="container.xl">
      <HStack alignItems="start">
        <VStack w="33%">
          <Box fontWeight="bold">Users</Box>
          <Table>
            <Thead>
              <Tr>
                <Th>displayName</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((v) => (
                <Tr key={v.id}>
                  <Td>{v.displayName}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </VStack>
        <VStack w="33%">
          <Box fontWeight="bold">Tweets</Box>
          <Table>
            <Thead>
              <Tr>
                <Th>content</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tweets.map((v) => (
                <Tr key={v.id}>
                  <Td>{v.content}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </VStack>
        <VStack w="33%">
          <Box fontWeight="bold">Tweet Form</Box>
          <form onSubmit={onCreateTweet}>
            <Stack>
              <FormControl>
                <FormLabel>Content</FormLabel>
                <Textarea
                  value={tweetContentInput.value}
                  onChange={tweetContentInput.onChange}
                  w="72"
                  required
                />
              </FormControl>

              <Button type="submit">Post</Button>
            </Stack>
          </form>
        </VStack>
      </HStack>
    </Container>
  );
};
