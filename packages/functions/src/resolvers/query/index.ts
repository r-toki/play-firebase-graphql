import { first } from "lodash";

import { Resolvers } from "../../graphql/generated";
import { isSignedIn } from "../../lib/authorization";
import { getDoc, getDocs } from "../../lib/query/util/get";
import { tweetsRef, usersRef } from "../../lib/typed-ref";
import { getFeed } from "./../../lib/query/getFeed";

export const Query: Resolvers["Query"] = {
  me: async (parent, args, context) => {
    isSignedIn(context);

    const {
      decodedIdToken: { uid },
      db,
    } = context;

    const meDoc = await getDoc(usersRef(db).doc(uid));

    return meDoc;
  },

  user: async (parent, args, context) => {
    isSignedIn(context);

    const { id } = args;
    const { db } = context;

    const userDoc = await getDoc(usersRef(db).doc(id));

    return userDoc;
  },

  users: async (parent, args, context) => {
    isSignedIn(context);

    const { db } = context;

    const userDocs = await getDocs(usersRef(db).orderBy("createdAt", "desc"));

    return userDocs;
  },

  tweet: async (parent, args, context) => {
    isSignedIn(context);

    const { id } = args;
    const { db } = context;

    const tweetDocs = await getDocs(tweetsRef(db).where("tweetId", "==", id));
    const tweetDoc = first(tweetDocs);
    if (!tweetDoc) throw new Error("at tweet");

    return tweetDoc;
  },

  feed: async (parent, args, context) => {
    isSignedIn(context);

    const { first, after } = args;
    const {
      decodedIdToken: { uid },
      db,
    } = context;

    const tweetConnection = await getFeed(db, {
      userId: uid,
      first,
      after,
    });

    return tweetConnection;
  },

  tweetEdge: async (parent, args, context) => {
    isSignedIn(context);

    const { id } = args;

    const tweetDocs = await getDocs(tweetsRef(context.db).where("tweetId", "==", id));
    const tweetDoc = first(tweetDocs);
    if (!tweetDoc) throw new Error("at tweetEdge");

    const tweetEdge = { node: tweetDoc, cursor: tweetDoc.createdAt.toDate().toISOString() };

    return tweetEdge;
  },
};
