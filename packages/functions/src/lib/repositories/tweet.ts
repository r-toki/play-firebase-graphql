import { Firestore, Timestamp } from "firebase-admin/firestore";
import { first, last } from "lodash";

import { getDocs } from "../query-util/get";
import { tweetsRef, userTweetsRef } from "../typed-ref";

// NOTE: Query
export const getTweet = async (db: Firestore, { id }: { id: string }) => {
  const tweetDocs = await getDocs(tweetsRef(db).where("tweetId", "==", id));
  const tweetDoc = first(tweetDocs);
  if (!tweetDoc) throw new Error("tweetDoc not found at getTweet");
  return tweetDoc;
};

export const getTweetEdge = async (db: Firestore, { id }: { id: string }) => {
  const tweetDoc = await getTweet(db, { id });
  const tweetEdge = { node: tweetDoc, cursor: tweetDoc.createdAt.toDate().toISOString() };
  return tweetEdge;
};

export const getTweets = async (
  db: Firestore,
  { userId, first, after }: { userId: string; first: number; after: string | null | undefined }
) => {
  const tweetDocs = await getDocs(
    tweetsRef(db)
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .startAfter(after ? Timestamp.fromDate(new Date(after)) : Timestamp.now())
      .limit(first)
  );

  const tweetEdges = tweetDocs.map((doc) => ({
    node: doc,
    cursor: doc.createdAt.toDate().toISOString(),
  }));
  const pageInfo = { hasNext: tweetEdges.length === first, endCursor: last(tweetEdges)?.cursor };

  return { edges: tweetEdges, pageInfo };
};

// NOTE: Mutation
export const createTweet = async (
  db: Firestore,
  { userId, tweetId, content }: { userId: string; tweetId: string; content: string }
) => {
  await userTweetsRef(db, { userId }).doc(tweetId).set({
    content,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    tweetId,
    userId,
  });
};

export const updateTweet = async (
  db: Firestore,
  { userId, tweetId, content }: { userId: string; tweetId: string; content: string }
) => {
  await userTweetsRef(db, { userId }).doc(tweetId).set({ content }, { merge: true });
};

export const deleteTweet = async (
  db: Firestore,
  { userId, tweetId }: { userId: string; tweetId: string }
) => {
  await userTweetsRef(db, { userId }).doc(tweetId).delete();
};
