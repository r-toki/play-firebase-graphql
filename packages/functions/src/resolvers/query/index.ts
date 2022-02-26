import { QueryDocumentSnapshot, Timestamp } from "firebase-admin/firestore";
import { first, last, orderBy } from "lodash";

import { Resolvers } from "../../graphql/generated";
import { isSignedIn } from "../../lib/authorization";
import { execMultiQueriesWithCursor } from "../../lib/query/util/exec-multi-queries-with-cursor";
import { getDoc, getDocs } from "../../lib/query/util/get";
import { followRelationshipsRef, tweetsRef, usersRef } from "../../lib/typed-ref";
import { UserTweetData } from "../../lib/typed-ref/types";

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

    const relationshipDocs = await getDocs(
      followRelationshipsRef(db).where("followerId", "==", uid)
    );
    const queries = [uid, ...relationshipDocs.map((v) => v.followedId)].map((id) =>
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

  tweetEdge: async (parent, args, context) => {
    isSignedIn(context);

    const { id } = args;

    const tweetDocs = await getDocs(tweetsRef(context.db).where("tweetId", "==", id));
    const tweetDoc = first(tweetDocs);
    if (!tweetDoc) throw new Error("at tweetEdge");

    return { node: tweetDoc, cursor: tweetDoc.createdAt.toDate().toISOString() };
  },
};
