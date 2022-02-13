import { gql, useQuery } from "@apollo/client";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { FormEventHandler, useEffect, VFC } from "react";

import { ApolloWithTokenProvider } from "./context/ApolloWithToken";
import { AuthProvider, useAuth } from "./context/Auth";
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
        <div>error: {(!!hello.error).toString()}</div>
        <div>data: {hello.data?.hello}</div>
      </div>
      <div style={{ width: "30px" }} />
      <div>
        <div>query helloWithAuth</div>
        <div>loading: {helloWithAuth.loading.toString()}</div>
        <div>error: {(!!helloWithAuth.error).toString()}</div>
        <div>data: {helloWithAuth.data?.helloWithAuth}</div>
      </div>
    </div>
  );
};

const SignupForm: VFC = () => {
  const emailInput = useTextInput();
  const passwordInput = useTextInput();

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(getAuth(), emailInput.value, passwordInput.value);
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

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(getAuth(), emailInput.value, passwordInput.value);
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
  useEffect(() => {
    console.log(authState);
  }, [authState]);

  const onLogout = () => {
    signOut(getAuth());
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
      </div>
      <div style={{ height: "16px" }} />
      <div>uid: {authState.uid}</div>
      <div style={{ height: "16px" }} />
      <Hello />
    </div>
  );
};

const App: VFC = () => {
  return (
    <AuthProvider>
      <ApolloWithTokenProvider>
        <Index />
      </ApolloWithTokenProvider>
    </AuthProvider>
  );
};

export default App;
