import { Firestore } from "firebase-admin/firestore";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

import { Resolvers } from "../graphql/generated";
import { usersRef, userTweetsRef } from "./../lib/typed-ref/index";

type Context = { decodedIdToken: DecodedIdToken | undefined; db: Firestore };

export const resolvers: Resolvers<Context> = {
  Query: {
    users: (parent, args, { db }) => {
      return usersRef(db)
        .orderBy("createdAt")
        .get()
        .then(({ docs }) => docs.map((doc) => ({ id: doc.id, ref: doc.ref, ...doc.data() })));
    },
  },
  User: {
    tweets: (parent, args, { db }) => {
      return userTweetsRef(db, { userId: parent.id })
        .orderBy("createdAt", "desc")
        .get()
        .then(({ docs }) => docs.map((doc) => ({ id: doc.id, ref: doc.ref, ...doc.data() })));
    },
  },
  Tweet: {
    creator: (parent, args, { db }) => {
      return usersRef(db)
        .doc(parent.creatorId)
        .get()
        .then((doc) => ({ id: doc.id, ref: doc.ref, ...doc.data()! }));
    },
  },
};
