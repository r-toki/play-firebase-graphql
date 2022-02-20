import { gql } from "@apollo/client";
import { Button, Container, FormControl, FormLabel, Heading, Input, Stack } from "@chakra-ui/react";
import { FormEventHandler, VFC } from "react";

import { AppLink } from "../../../components/shared/AppLink";
import { useAuthed } from "../../../context/Authed";
import { useUpdateProfileMutation } from "../../../graphql/generated";
import { useTextInput } from "../../../hooks/useTextInput";
import { routes } from "../../../routes";

gql`
  mutation updateProfile($id: ID!, $input: UpdateProfileInput!) {
    updateProfile(id: $id, input: $input) {
      id
      displayName
    }
  }
`;

const UserEditForm: VFC = () => {
  const { currentUser } = useAuthed();

  const [updateProfile] = useUpdateProfileMutation();

  const [displayNameInput] = useTextInput(currentUser?.displayName);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({
        variables: {
          id: currentUser.id,
          input: { displayName: displayNameInput.value },
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <FormControl>
          <FormLabel>Display Name</FormLabel>
          <Input {...displayNameInput} />
        </FormControl>

        <Button type="submit">Update</Button>
      </Stack>
    </form>
  );
};

export const UserEdit: VFC = () => {
  return (
    <Container>
      <Stack>
        <Heading>User Edit</Heading>
        <UserEditForm />
        <AppLink to={routes["/"].path()}>Back</AppLink>
      </Stack>
    </Container>
  );
};
