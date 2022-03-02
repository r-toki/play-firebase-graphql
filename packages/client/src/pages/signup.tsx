import { Button, Container, FormControl, FormLabel, Heading, Input, Stack } from "@chakra-ui/react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { VFC } from "react";

import { AppLink } from "../components/shared/AppLink";
import { TextInput, useTextInput } from "../hooks/useTextInput";
import { routes } from "../routes";
import { OnSubmit } from "../types";

const useSignUpPage = () => {
  const [emailInput] = useTextInput();
  const [passwordInput] = useTextInput();
  const [passwordConfirmInput] = useTextInput();

  const onSubmit: OnSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(getAuth(), emailInput.value, passwordInput.value);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    emailInput,
    passwordInput,
    passwordConfirmInput,
    onSubmit,
  };
};

type SignupFormProps = {
  emailInput: TextInput;
  passwordInput: TextInput;
  passwordConfirmInput: TextInput;
  onSubmit: OnSubmit;
};

const SignupForm: VFC<SignupFormProps> = ({
  emailInput,
  passwordInput,
  passwordConfirmInput,
  onSubmit,
}) => {
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
          <Input type="password" {...passwordConfirmInput} />
        </FormControl>

        <Button type="submit">Signup</Button>
      </Stack>
    </form>
  );
};

export const Signup: VFC = () => {
  const { emailInput, passwordInput, passwordConfirmInput, onSubmit } = useSignUpPage();

  return (
    <Container py="4">
      <Stack>
        <Heading textAlign="center">Signup</Heading>
        <SignupForm {...{ emailInput, passwordInput, passwordConfirmInput, onSubmit }} />
        <AppLink to={routes["/login"].path()}>to Login</AppLink>
      </Stack>
    </Container>
  );
};
