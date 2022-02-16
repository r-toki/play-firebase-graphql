import { Firestore } from "firebase-admin/firestore";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

import { Resolvers } from "../graphql/generated";
import { usersRef } from "./../lib/typed-ref/index";

type Context = { decodedIdToken: DecodedIdToken | undefined; db: Firestore };

export const resolvers: Resolvers<Context> = {
  Query: {
    users: async (parent, args, { db }) => {
      const users = await usersRef(db)
        .orderBy("createdAt")
        .get()
        .then(({ docs }) => docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      return users.map((v) => ({ id: v.id, displayName: v.displayName }));
    },
  },
};
