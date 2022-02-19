import { Firestore } from "firebase-admin/firestore";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

import { Resolvers } from "../graphql/generated";
import { getDoc, getDocs } from "../lib/firestore-helper";
import { usersRef, userTweetsRef } from "./../lib/typed-ref/index";

type Context = { decodedIdToken: DecodedIdToken | undefined; db: Firestore };

export const resolvers: Resolvers<Context> = {
  Query: {
    users: (parent, args, { db }) => getDocs(usersRef(db).orderBy("createdAt")),
  },
  User: {
    tweets: (parent, args, { db }) =>
      getDocs(userTweetsRef(db, { userId: parent.id }).orderBy("createdAt", "desc")),
  },
  Tweet: {
    creator: (parent, args, { db }) => getDoc(usersRef(db).doc(parent.creatorId)),
  },
};
