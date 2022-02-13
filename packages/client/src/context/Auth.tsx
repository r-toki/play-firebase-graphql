import { getAuth, getIdToken, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { createContainer } from "unstated-next";

type State = { initialized: boolean; uid: string | undefined; token: string | undefined };
type Value = State;

const useAuthContainer = (): Value => {
  const [state, setState] = useState<State>({
    initialized: false,
    uid: undefined,
    token: undefined,
  });

  useEffect(() => {
    onAuthStateChanged(getAuth(), async (authUser) => {
      if (authUser) {
        const token = await getIdToken(authUser);
        setState({ initialized: true, uid: authUser.uid, token });
      } else {
        setState({ initialized: true, uid: undefined, token: undefined });
      }
    });
  }, []);

  return state;
};

const Auth = createContainer(useAuthContainer);
export const AuthProvider = Auth.Provider;
export const useAuth = Auth.useContainer;
