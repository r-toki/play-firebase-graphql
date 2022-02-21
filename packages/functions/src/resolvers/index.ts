import { AuthenticationError } from "apollo-server-express";
import { Firestore, Timestamp } from "firebase-admin/firestore";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { isUndefined, omitBy, orderBy } from "lodash";

import { Resolvers } from "../graphql/generated";
import { getDoc, getDocs } from "../lib/query/util/get";
import { UserTweetData } from "../lib/typed-ref/types";
import { tweetsRef, usersRef, userTweetsRef, followingRef } from "./../lib/typed-ref/index";
import { DateTime } from "./DateTime";

type Context = { decodedIdToken: DecodedIdToken | undefined; db: Firestore };

export const resolvers: Resolvers<Context> = {
  Query: {
    user: (parent, args, { db }) => getDoc(usersRef(db).doc(args.id)),
    users: (parent, args, { db }) => getDocs(usersRef(db).orderBy("createdAt", "desc")),
    feed: async (parent, args, { decodedIdToken, db }) => {
      // TODO: 後でクエリカーソルを引数化する
      const startAfter = Timestamp.fromDate(new Date());
      const limit = 50;

      if (!decodedIdToken) throw new AuthenticationError("unauthorized");

      const res: ({
        id: string;
        ref: FirebaseFirestore.DocumentReference<UserTweetData>;
      } & UserTweetData)[] = [];

      const followings = await getDocs(
        followingRef(db).where("followeeId", "==", decodedIdToken.uid)
      );

      let followerRecentTweets = (
        await Promise.all(
          [decodedIdToken.uid, ...followings.map((v) => v.followerId)].map((id) =>
            getDocs(
              tweetsRef(db)
                .where("creatorId", "==", id)
                .orderBy("createdAt", "desc")
                .startAfter(startAfter)
                .limit(1)
            )
          )
        )
      ).flat();

      let i = 0;
      while (i < limit) {
        const [head, ...rest] = orderBy(followerRecentTweets, "createdAt", "desc");
        if (!head) return res;
        res.push(head);
        followerRecentTweets = rest;
        const candidate = await getDocs(
          tweetsRef(db)
            .where("creatorId", "==", head.creatorId)
            .orderBy("createdAt", "desc")
            .startAfter(head.createdAt)
            .limit(1)
        );
        followerRecentTweets.push(...candidate);
        i++;
      }

      return res;
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
