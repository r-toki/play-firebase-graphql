import { gql, useQuery } from "@apollo/client";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { FormEventHandler, VFC } from "react";

import { ApolloWithTokenProvider } from "./context/ApolloWithToken";
import { useAuth } from "./context/Auth";
import { HelloDocument, HelloWithAuthDocument } from "./graphql/generated";
import { useTextInput } from "./hooks/useTextInput";

gql`
  query hello {
    hello
  }

  query helloWithAuth {
    helloWithAuth
  }
`;

const Hello: VFC = () => {
  const hello = useQuery(HelloDocument);
  const helloWithAuth = useQuery(HelloWithAuthDocument);

  return (
    <div style={{ display: "flex" }}>
      <div>
        <div>query hello</div>
        <div>loading: {hello.loading.toString()}</div>
        <div>error: {hello.error?.message}</div>
        <div>data: {hello.data?.hello}</div>
      </div>
      <div style={{ width: "30px" }} />
      <div>
        <div>query helloWithAuth</div>
        <div>loading: {helloWithAuth.loading.toString()}</div>
        <div>error: {helloWithAuth.error?.message}</div>
        <div>data: {helloWithAuth.data?.helloWithAuth}</div>
      </div>
    </div>
  );
};

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
      <div>
        <label htmlFor="email">Email</label>
        <br />
        <input name="email" type="email" value={emailInput.value} onChange={emailInput.onChange} />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <br />
        <input
          name="password"
          type="password"
          value={passwordInput.value}
          onChange={passwordInput.onChange}
        />
      </div>

      <button type="submit">Signup</button>
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
      <div>
        <label htmlFor="email">Email</label>
        <br />
        <input name="email" type="email" value={emailInput.value} onChange={emailInput.onChange} />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <br />
        <input
          name="password"
          type="password"
          value={passwordInput.value}
          onChange={passwordInput.onChange}
        />
      </div>

      <button type="submit">Login</button>
    </form>
  );
};

const Index: VFC = () => {
  const authState = useAuth();

  const onLogout = () => {
    signOut(getAuth());
  };

  const onDelete = () => {
    const currentUser = getAuth().currentUser;
    if (currentUser) {
      deleteUser(currentUser);
    }
  };

  return (
    <div style={{ width: "720px", margin: "0 auto" }}>
      <div style={{ display: "flex" }}>
        <SignupForm />
        <div style={{ width: "16px" }} />
        <LoginForm />
        <div style={{ width: "16px" }} />
        <button onClick={onLogout} style={{ alignSelf: "end" }}>
          Logout
        </button>
        <div style={{ width: "16px" }} />
        <button onClick={onDelete} style={{ alignSelf: "end" }}>
          Delete
        </button>
      </div>
      <div style={{ height: "16px" }} />
      <div>uid: {authState.uid}</div>
      <div style={{ height: "16px" }} />
      <Hello />
    </div>
  );
};

const App: VFC = () => {
  const authState = useAuth();
  return authState.initialized ? (
    <ApolloWithTokenProvider>
      <Index />
    </ApolloWithTokenProvider>
  ) : null;
};

export default App;
