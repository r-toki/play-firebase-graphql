import { Button, Container, FormControl, FormLabel, Heading, Input, Stack } from "@chakra-ui/react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FormEventHandler, VFC } from "react";

import { AppLink } from "../components/shared/AppLink";
import { useTextInput } from "../hooks/useTextInput";
import { routes } from "../routes";

const LoginForm: VFC = () => {
  const [emailInput] = useTextInput();
  const [passwordInput] = useTextInput();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(getAuth(), emailInput.value, passwordInput.value);
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

        <Button type="submit">Login</Button>
      </Stack>
    </form>
  );
};

export const Login: VFC = () => {
  return (
    <Container py="4">
      <Stack>
        <Heading textAlign="center">Login</Heading>
        <LoginForm />
        <AppLink to={routes["/signup"].path()}>to Signup</AppLink>
      </Stack>
    </Container>
  );
};
