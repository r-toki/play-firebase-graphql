import { AuthenticationError } from "apollo-server-express";
import { auth } from "firebase-admin";
import { Firestore } from "firebase-admin/firestore";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

import { Resolvers } from "../graphql/generated";

type Context = { decodedIdToken: DecodedIdToken | undefined; db: Firestore };

export const resolvers: Resolvers<Context> = {
  Query: {
    hello: () => {
      return "Hello world!";
    },
    helloWithAuth: (parent, args, context) => {
      if (!context.decodedIdToken) throw new AuthenticationError("authentication error");
      return "Hello world with auth!";
    },
    currentUser: async (parent, args, context) => {
      if (!context.decodedIdToken) throw new AuthenticationError("authentication error");
      const user = await auth().getUser(context.decodedIdToken.uid);
      return {
        displayName: user.displayName || user.email || "MyString",
      };
    },
  },
};
