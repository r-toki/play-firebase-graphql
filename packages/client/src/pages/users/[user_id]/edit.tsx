import { gql } from "@apollo/client";
import { Button, Container, FormControl, FormLabel, Heading, Input, Stack } from "@chakra-ui/react";
import { VFC } from "react";

import { AppLink } from "../../../components/shared/AppLink";
import { useCurrentUser } from "../../../context/CurrentUser";
import { useUpdateProfileMutation } from "../../../graphql/generated";
import { TextInput, useTextInput } from "../../../hooks/useTextInput";
import { routes } from "../../../routes";
import { OnSubmit } from "../../../types";

gql`
  mutation updateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      id
      ...currentUserContext
    }
  }
`;

const useUserEditPage = () => {
  const currentUser = useCurrentUser();

  const [updateProfile] = useUpdateProfileMutation();

  const [displayNameInput] = useTextInput(currentUser.displayName);
  const onSubmit: OnSubmit = async (e) => {
    e.preventDefault();
    await updateProfile({ variables: { input: { displayName: displayNameInput.value } } });
  };

  return { displayNameInput, onSubmit };
};

type UserEditFormProps = {
  displayNameInput: TextInput;
  onSubmit: OnSubmit;
};

const UserEditForm: VFC<UserEditFormProps> = ({ displayNameInput, onSubmit }) => {
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

export const UserEditPage: VFC = () => {
  const { displayNameInput, onSubmit } = useUserEditPage();
  return (
    <Container>
      <Stack>
        <Heading>User Edit</Heading>
        <UserEditForm {...{ displayNameInput, onSubmit }} />
        <AppLink to={routes["/"].path()}>Back</AppLink>
      </Stack>
    </Container>
  );
};
