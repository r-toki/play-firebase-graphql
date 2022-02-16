import { Button, Container, FormControl, FormLabel, Heading, Input, Stack } from "@chakra-ui/react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { FormEventHandler, VFC } from "react";

import { AppLink } from "../components/shared/AppLink";
import { useTextInput } from "../hooks/useTextInput";
import { routes } from "../routes";

const SignupForm: VFC = () => {
  const emailInput = useTextInput();
  const passwordInput = useTextInput();
  const passwordConfirmationInput = useTextInput();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(getAuth(), emailInput.value, passwordInput.value);
      emailInput.reset();
      passwordInput.reset();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={emailInput.value} onChange={emailInput.onChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={passwordInput.value} onChange={passwordInput.onChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Password Confirmation</FormLabel>
          <Input
            type="password"
            value={passwordConfirmationInput.value}
            onChange={passwordConfirmationInput.onChange}
          />
        </FormControl>

        <Button type="submit">Signup</Button>
      </Stack>
    </form>
  );
};

export const Signup: VFC = () => {
  return (
    <Container>
      <Stack>
        <Heading>Signup</Heading>
        <SignupForm />
        <AppLink to={routes["/login"].path()}>to Login</AppLink>
      </Stack>
    </Container>
  );
};
