import { assertIsDefined } from "../lib/type-utils";
import { useAuth } from "./../context/Auth";

export const useAuthenticated = () => {
  const { uid } = useAuth();
  assertIsDefined(uid);
  return { uid };
};
