import { Firestore } from "firebase-admin/firestore";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

export type Context = { decodedIdToken: DecodedIdToken | undefined; db: Firestore };
