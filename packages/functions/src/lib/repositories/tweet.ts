import { Firestore, Timestamp } from "firebase-admin/firestore";
import { first } from "lodash";

import { getDocs } from "../query-util/get";
import { tweetsRef, userTweetsRef } from "../typed-ref";

// NOTE: Query
export const getTweet = async (db: Firestore, { tweetId }: { tweetId: string }) => {
  const tweetDocs = await getDocs(tweetsRef(db).where("tweetId", "==", tweetId));
  const tweetDoc = first(tweetDocs);
  if (!tweetDoc) throw new Error("tweetDoc not found at getTweet");
  return tweetDoc;
};

export const getTweetEdge = async (db: Firestore, { tweetId }: { tweetId: string }) => {
  const tweetDoc = await getTweet(db, { tweetId });
  const tweetEdge = { node: tweetDoc, cursor: tweetDoc.createdAt.toDate().toISOString() };
  return tweetEdge;
};

// NOTE: Mutation
export const createTweet = async (
  db: Firestore,
  { tweetId, creatorId, content }: { tweetId: string; creatorId: string; content: string }
) => {
  await userTweetsRef(db, { userId: creatorId }).doc(tweetId).set({
    content,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    tweetId,
    creatorId,
  });
};

export const updateTweet = async (
  db: Firestore,
  { tweetId, creatorId, content }: { tweetId: string; creatorId: string; content: string }
) => {
  await userTweetsRef(db, { userId: creatorId }).doc(tweetId).set({ content }, { merge: true });
};

export const deleteTweet = async (
  db: Firestore,
  { tweetId, creatorId }: { tweetId: string; creatorId: string }
) => {
  await userTweetsRef(db, { userId: creatorId }).doc(tweetId).delete();
};
