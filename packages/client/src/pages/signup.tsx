import { Button, Container, FormControl, FormLabel, Heading, Input, Stack } from "@chakra-ui/react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { FormEventHandler, VFC } from "react";

import { AppLink } from "../components/shared/AppLink";
import { useTextInput } from "../hooks/useTextInput";
import { routes } from "../routes";

const SignupForm: VFC = () => {
  const [emailInput] = useTextInput();
  const [passwordInput] = useTextInput();
  const [passwordConfirmationInput] = useTextInput();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(getAuth(), emailInput.value, passwordInput.value);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" {...emailInput} />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type="password" {...passwordInput} />
        </FormControl>

        <FormControl>
          <FormLabel>Password Confirmation</FormLabel>
          <Input type="password" {...passwordConfirmationInput} />
        </FormControl>

        <Button type="submit">Signup</Button>
      </Stack>
    </form>
  );
};

export const Signup: VFC = () => {
  return (
    <Container py="4">
      <Stack>
        <Heading textAlign="center">Signup</Heading>
        <SignupForm />
        <AppLink to={routes["/login"].path()}>to Login</AppLink>
      </Stack>
    </Container>
  );
};
