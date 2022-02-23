import { QueryDocumentSnapshot, Timestamp } from "firebase-admin/firestore";
import { first, last, orderBy } from "lodash";

import { Resolvers } from "../../graphql/generated";
import { execMultiQueriesWithCursor } from "../../lib/query/util/exec-multi-queries-with-cursor";
import { getDoc, getDocs } from "../../lib/query/util/get";
import { followRelationshipsRef, tweetsRef, usersRef } from "../../lib/typed-ref";
import { UserTweetData } from "../../lib/typed-ref/types";

export const Query: Resolvers["Query"] = {
  me: (parent, args, { decodedIdToken, db }) => {
    if (!decodedIdToken) throw new Error("");
    return getDoc(usersRef(db).doc(decodedIdToken.uid));
  },
  user: (parent, args, { db }) => getDoc(usersRef(db).doc(args.id)),
  users: (parent, args, { db }) => getDocs(usersRef(db).orderBy("createdAt", "desc")),
  tweet: async (parent, args, { db }) => {
    const docs = await getDocs(tweetsRef(db).where("tweetId", "==", args.id));
    const doc = first(docs);
    if (!doc) throw new Error("");
    return doc;
  },
  feed: async (parent, args, { decodedIdToken, db }) => {
    if (!decodedIdToken) throw new Error("");

    const { uid } = decodedIdToken;
    const { first, after } = args;

    const relationships = await getDocs(followRelationshipsRef(db).where("followerId", "==", uid));
    const queries = [uid, ...relationships.map((v) => v.followedId)].map((id) =>
      tweetsRef(db).where("creatorId", "==", id).orderBy("createdAt", "desc")
    );
    const order = (snaps: QueryDocumentSnapshot<UserTweetData>[]) =>
      orderBy(snaps, (snap) => snap.data().createdAt, "desc");
    const snaps = await execMultiQueriesWithCursor(queries, order, {
      startAfter: after ? Timestamp.fromDate(new Date(after)) : Timestamp.now(),
      limit: first,
    });

    const tweets = snaps.map((snap) => ({ id: snap.id, ref: snap.ref, ...snap.data() }));
    const tweetEdges = tweets.map((doc) => ({
      node: doc,
      cursor: doc.createdAt.toDate().toISOString(),
    }));

    const pageInfo = { hasNext: tweets.length > 0, endCursor: last(tweetEdges)?.cursor };

    return { edges: tweetEdges, pageInfo };
  },
  oneOfFeed: async (parent, args, { db }) => {
    const docs = await getDocs(tweetsRef(db).where("tweetId", "==", args.id));
    const doc = first(docs);
    if (!doc) throw new Error("");
    return { node: doc, cursor: doc.createdAt.toDate().toISOString() };
  },
};
