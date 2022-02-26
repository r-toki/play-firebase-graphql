import { Config, ExpressContext } from "apollo-server-express";
import { Auth } from "firebase-admin/auth";
import { Firestore } from "firebase-admin/firestore";

import { auth, db, verifyIdToken } from "./firebase-app";

export type Context = { uid: string | undefined; db: Firestore; auth: Auth };
export type AuthedContext = { uid: string; db: Firestore; auth: Auth };
export type NotAuthedContext = { uid: undefined; db: Firestore; auth: Auth };

export const context: Config<ExpressContext>["context"] = async ({ req }): Promise<Context> => {
  const idToken = req.header("authorization")?.split("Bearer ")[1];

  if (idToken) {
    const decodedIdToken = await verifyIdToken(idToken);
    return { uid: decodedIdToken.uid, auth, db };
  }

  return { uid: undefined, auth, db };
};
