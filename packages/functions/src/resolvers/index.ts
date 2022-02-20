import { Firestore } from "firebase-admin/firestore";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

import { Resolvers } from "../graphql/generated";
import { getDoc, getDocs } from "../lib/firestore-helper";
import { tweetsRef, usersRef, userTweetsRef } from "./../lib/typed-ref/index";
import { DateTime } from "./DateTime";

type Context = { decodedIdToken: DecodedIdToken | undefined; db: Firestore };

export const resolvers: Resolvers<Context> = {
  Query: {
    users: (parent, args, { db }) => getDocs(usersRef(db).orderBy("createdAt", "desc")),
    tweets: (parent, args, { db }) => getDocs(tweetsRef(db).orderBy("createdAt", "desc")),
  },
  User: {
    tweets: (parent, args, { db }) =>
      getDocs(userTweetsRef(db, { userId: parent.id }).orderBy("createdAt", "desc")),
  },
  Tweet: {
    creator: (parent, args, { db }) => getDoc(usersRef(db).doc(parent.creatorId)),
  },
  DateTime,
};
