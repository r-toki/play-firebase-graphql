import { Button, Container, FormControl, FormLabel, Heading, Input, Stack } from "@chakra-ui/react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FormEventHandler, useEffect, VFC } from "react";

import { db } from "../../../firebaseApp";
import { useAuthenticated } from "../../../hooks/useAuthed";
import { useTextInput } from "../../../hooks/useTextInput";
import { usersRef } from "../../../lib/typed-ref";

const UserEditForm: VFC = () => {
  const { uid } = useAuthenticated();

  useEffect(() => {
    getDoc(doc(usersRef(db), uid)).then((snap) => {
      displayNameInput.reset(snap.data()?.displayName || "");
    });
  }, []);

  const displayNameInput = useTextInput();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(usersRef(db), uid), { displayName: displayNameInput.value });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <FormControl>
          <FormLabel>Display Name</FormLabel>
          <Input value={displayNameInput.value} onChange={displayNameInput.onChange} />
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
      </Stack>
    </Container>
  );
};
