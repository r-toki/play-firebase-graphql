import { AuthenticationError } from "apollo-server-express";
import { Firestore, Timestamp } from "firebase-admin/firestore";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { chunk, isUndefined, omitBy, orderBy } from "lodash";

import { Resolvers } from "../graphql/generated";
import { getDoc, getDocs } from "../lib/firestore-helper";
import { tweetsRef, usersRef, userTweetsRef, followingRef } from "./../lib/typed-ref/index";
import { DateTime } from "./DateTime";

type Context = { decodedIdToken: DecodedIdToken | undefined; db: Firestore };

export const resolvers: Resolvers<Context> = {
  Query: {
    user: (parent, args, { db }) => getDoc(usersRef(db).doc(args.id)),
    users: (parent, args, { db }) => getDocs(usersRef(db).orderBy("createdAt", "desc")),
    tweets: (parent, args, { db }) => getDocs(tweetsRef(db).orderBy("createdAt", "desc")),
    feed: async (parent, args, { decodedIdToken, db }) => {
      if (!decodedIdToken) throw new AuthenticationError("unauthorized");
      const followers = await getDocs(
        followingRef(db).where("followeeId", "==", decodedIdToken.uid)
      );
      const chunkedTweets = await Promise.all(
        chunk([decodedIdToken.uid, followers.map((v) => v.id)], 10).map((ids) =>
          getDocs(tweetsRef(db).where("creatorId", "in", ids))
        )
      );
      return orderBy(chunkedTweets.flat(), "createdAt", "desc");
    },
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
