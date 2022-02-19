import { assertIsDefined } from "../lib/type-utils";
import { useAuth } from "./../context/Auth";

export const useAuthed = () => {
  const { uid } = useAuth();
  assertIsDefined(uid);
  return { uid };
};
