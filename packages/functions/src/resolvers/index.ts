import { AuthenticationError } from "apollo-server-express";
import { Firestore } from "firebase-admin/firestore";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

import { Resolvers } from "../graphql/generated";

type Context = { decodedIdToken: DecodedIdToken | undefined; db: Firestore };

export const resolvers: Resolvers<Context> = {
  Query: {
    hello: () => "Hello world!",
    helloWithAuth: (parent, args, context) => {
      if (!context.decodedIdToken) throw new AuthenticationError("");
      return "Hello world with auth!";
    },
  },
};
