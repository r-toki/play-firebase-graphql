import { Button, Container, FormControl, FormLabel, Heading, Input, Stack } from "@chakra-ui/react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { VFC } from "react";

import { AppLink } from "../components/shared/AppLink";
import { TextInput, useTextInput } from "../hooks/useTextInput";
import { routes } from "../routes";
import { OnSubmit } from "../types";

const useLoginPage = () => {
  const [emailInput] = useTextInput();
  const [passwordInput] = useTextInput();

  const onSubmit: OnSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(getAuth(), emailInput.value, passwordInput.value);
    } catch (e) {
      console.error(e);
    }
  };

  return { emailInput, passwordInput, onSubmit };
};

type LoginFormProps = {
  emailInput: TextInput;
  passwordInput: TextInput;
  onSubmit: OnSubmit;
};

const LoginForm: VFC<LoginFormProps> = ({ emailInput, passwordInput, onSubmit }) => {
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
  const { emailInput, passwordInput, onSubmit } = useLoginPage();

  return (
    <Container py="4">
      <Stack>
        <Heading textAlign="center">Login</Heading>
        <LoginForm {...{ emailInput, passwordInput, onSubmit }} />
        <AppLink to={routes["/signup"].path()}>to Signup</AppLink>
      </Stack>
    </Container>
  );
};
