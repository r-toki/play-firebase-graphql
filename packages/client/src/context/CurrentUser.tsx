import { gql } from "@apollo/client";
import { createContext, ReactNode, useContext, VFC } from "react";

import { CurrentUserContextFragment } from "../graphql/generated";
import { assertIsDefined } from "../lib/type-utils";

gql`
  fragment currentUserContext on User {
    id
    displayName
  }

  query meForCurrentUserContext {
    me {
      id
      ...currentUserContext
    }
  }
`;

type State = CurrentUserContextFragment | undefined;

const CurrentUserContext = createContext<State>(undefined);

type CurrentUserProviderProps = {
  currentUser: CurrentUserContextFragment;
  children: ReactNode;
};

export const CurrentUserProvider: VFC<CurrentUserProviderProps> = ({ currentUser, children }) => {
  return <CurrentUserContext.Provider value={currentUser}>{children}</CurrentUserContext.Provider>;
};

export const useCurrentUser = () => {
  const currentUser = useContext(CurrentUserContext);
  assertIsDefined(currentUser);
  return currentUser;
};
