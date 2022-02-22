import { AuthenticationError } from "apollo-server-express";
import { Firestore, QueryDocumentSnapshot, Timestamp } from "firebase-admin/firestore";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { UserTweetData } from "functions/src/lib/typed-ref/types";
import { last, orderBy } from "lodash";

import { Resolvers } from "../graphql/generated";
import { execMultiQueriesWithCursor } from "../lib/query/util/exec-multi-queries-with-cursor";
import { getDoc, getDocs } from "../lib/query/util/get";
import { followingRef, tweetsRef, usersRef, userTweetsRef } from "./../lib/typed-ref/index";
import { DateTime } from "./DateTime";

type Context = { decodedIdToken: DecodedIdToken | undefined; db: Firestore };

export const resolvers: Resolvers<Context> = {
  Query: {
    user: (parent, args, { db }) => getDoc(usersRef(db).doc(args.id)),
    users: (parent, args, { db }) => getDocs(usersRef(db).orderBy("createdAt", "desc")),
    feed: async (parent, args, { decodedIdToken, db }) => {
      if (!decodedIdToken) throw new AuthenticationError("unauthorized");

      const { uid } = decodedIdToken;
      const { first, after } = args;

      const followings = await getDocs(followingRef(db).where("followeeId", "==", uid));
      const queries = [uid, ...followings.map((v) => v.followerId)].map((id) =>
        tweetsRef(db).where("creatorId", "==", id).orderBy("createdAt", "desc")
      );
      const order = (snaps: QueryDocumentSnapshot<UserTweetData>[]) =>
        orderBy(snaps, (snap) => snap.data().createdAt, "desc");
      const snaps = await execMultiQueriesWithCursor(queries, order, {
        startAfter: after ? Timestamp.fromDate(new Date(after)) : Timestamp.now(),
        limit: first,
      });

      const tweetDocs = snaps.map((snap) => ({ id: snap.id, ref: snap.ref, ...snap.data() }));
      const tweetEdges = tweetDocs.map((doc) => ({
        node: doc,
        cursor: doc.createdAt.toDate().toISOString(),
      }));

      const pageInfo = { hasNext: tweetDocs.length > 0, endCursor: last(tweetEdges)?.cursor };

      return { edges: tweetEdges, pageInfo };
    },
  },
  Mutation: {
    updateProfile: async (parent, args, { db }) => {
      await usersRef(db).doc(args.id).set(
        {
          displayName: args.input.displayName,
        },
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
