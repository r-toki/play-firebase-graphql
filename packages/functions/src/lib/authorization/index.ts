import { AuthedContext, Context } from "../../context";

export function isSignedIn(context: Context): asserts context is AuthedContext {
  if (!context.uid) throw new Error("not signed in");
}
