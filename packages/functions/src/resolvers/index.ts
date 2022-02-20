import { Firestore, Timestamp } from "firebase-admin/firestore";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { isUndefined, omitBy } from "lodash";

import { Resolvers } from "../graphql/generated";
import { getDoc, getDocs } from "../lib/firestore-helper";
import { tweetsRef, usersRef, userTweetsRef } from "./../lib/typed-ref/index";
import { DateTime } from "./DateTime";

type Context = { decodedIdToken: DecodedIdToken | undefined; db: Firestore };

export const resolvers: Resolvers<Context> = {
  Query: {
    user: (parent, args, { db }) => getDoc(usersRef(db).doc(args.id)),
    users: (parent, args, { db }) => getDocs(usersRef(db).orderBy("createdAt", "desc")),
    tweets: (parent, args, { db }) => getDocs(tweetsRef(db).orderBy("createdAt", "desc")),
  },
  Mutation: {
    updateProfile: async (parent, args, { db }) => {
      await usersRef(db)
        .doc(args.id)
        .set(
          omitBy(
            {
              displayName: args.input.displayName,
              updatedAt: args.input.updatedAt
                ? Timestamp.fromDate(new Date(args.input.updatedAt))
                : undefined,
            },
            isUndefined
          ),
          { merge: true }
        );
      return getDoc(usersRef(db).doc(args.id));
    },
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
