import { gql } from "@apollo/client";
import { createContext, ReactNode, useContext, VFC } from "react";

import { CurrentUserFragment } from "../graphql/generated";
import { assertIsDefined } from "../lib/type-utils";

// NOTE: firebase auth -> apollo client init -> fetch currentUser の順になるので若干構造が複雑
//       middleware で少し頑張ってる

gql`
  fragment currentUser on User {
    id
    displayName
  }

  query currentUser {
    me {
      id
      ...currentUser
    }
  }
`;

type State = CurrentUserFragment | undefined;

const AuthedContext = createContext<State>(undefined);

type AuthedProviderProps = {
  currentUser: CurrentUserFragment;
  children: ReactNode;
};

export const AuthedProvider: VFC<AuthedProviderProps> = ({ currentUser, children }) => {
  return <AuthedContext.Provider value={currentUser}>{children}</AuthedContext.Provider>;
};

export const useAuthed = () => {
  const currentUser = useContext(AuthedContext);
  assertIsDefined(currentUser);
  return { currentUser };
};
