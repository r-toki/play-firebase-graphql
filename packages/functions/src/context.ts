import { Config, ExpressContext } from "apollo-server-express";
import { Auth } from "firebase-admin/auth";
import { Firestore } from "firebase-admin/firestore";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

import { auth, db, verifyIdToken } from "./firebase-app";

export type Context = { decodedIdToken: DecodedIdToken | undefined; db: Firestore; auth: Auth };
export type AuthedContext = { decodedIdToken: DecodedIdToken; db: Firestore; auth: Auth };
export type NotAuthedContext = { decodedIdToken: undefined; db: Firestore; auth: Auth };

export const context: Config<ExpressContext>["context"] = async ({ req }): Promise<Context> => {
  const idToken = req.header("authorization")?.split("Bearer ")[1];

  if (idToken) {
    const decodedIdToken = await verifyIdToken(idToken);
    return { decodedIdToken, auth, db };
  }

  return { decodedIdToken: undefined, auth, db };
};
