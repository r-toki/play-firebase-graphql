import { AuthedContext, Context } from "../../context";

export function isSignedIn(context: Context): asserts context is AuthedContext {
  if (!context.decodedIdToken) throw new Error("at isSignedIn");
}
