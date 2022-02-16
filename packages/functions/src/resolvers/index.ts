import { Firestore } from "firebase-admin/firestore";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

import { Resolvers } from "../graphql/generated";
import { usersRef, userTweetsRef } from "./../lib/typed-ref/index";

type Context = { decodedIdToken: DecodedIdToken | undefined; db: Firestore };

export const resolvers: Resolvers<Context> = {
  Query: {
    users: async (parent, args, { db }) => {
      const users = await usersRef(db)
        .orderBy("createdAt")
        .get()
        .then(({ docs }) => docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      return users.map((v) => ({ id: v.id, displayName: v.displayName, tweets: [] }));
    },
  },
  User: {
    tweets: async (parent, args, { db }) => {
      const userTweets = await userTweetsRef(db, { userId: parent.id })
        .orderBy("createdAt", "desc")
        .get()
        .then(({ docs }) => docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      return userTweets.map((v) => ({
        id: v.id,
        content: v.content,
      }));
    },
  },
};
