import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
} from "@chakra-ui/react";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FormEventHandler, useEffect, VFC } from "react";
import { useDocument } from "react-firebase-hooks/firestore";

import { useAuth } from "../../context/Auth";
import { auth, db } from "../../firebaseApp";
import { useTextInput } from "../../hooks/useTextInput";
import { usersRef } from "../../lib/typed-ref";

const SignupForm: VFC = () => {
  const emailInput = useTextInput();
  const passwordInput = useTextInput();

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

        <Button type="submit">Signup</Button>
      </Stack>
    </form>
  );
};

const LoginForm: VFC = () => {
  const emailInput = useTextInput();
  const passwordInput = useTextInput();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(getAuth(), emailInput.value, passwordInput.value);
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

        <Button type="submit">Login</Button>
      </Stack>
    </form>
  );
};

const ProfileForm: VFC = () => {
  const { uid } = useAuth();

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

export const AuthView: VFC = () => {
  const { uid } = useAuth();

  const [userSnap] = useDocument(uid ? doc(usersRef(db), uid) : null);

  const onLogout = () => {
    signOut(auth);
  };

  const onDelete = () => {
    const user = auth.currentUser;
    if (!user) return;
    deleteUser(user);
  };

  return (
    <Stack>
      <Heading>Auth</Heading>
      <Box>current user displayName: {userSnap?.data()?.displayName}</Box>
      <HStack>
        {uid ? (
          <>
            <ProfileForm />
            <Button alignSelf="end" onClick={onLogout}>
              Logout
            </Button>
            <Button alignSelf="end" onClick={onDelete}>
              Delete
            </Button>
          </>
        ) : (
          <>
            <SignupForm />
            <LoginForm />
          </>
        )}
      </HStack>
    </Stack>
  );
};
