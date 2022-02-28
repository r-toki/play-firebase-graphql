import { Firestore } from "firebase-admin/firestore";

import { getTweet } from "./getTweet";

export const getTweetEdge = async (db: Firestore, { id }: { id: string }) => {
  const tweetDoc = await getTweet(db, { id });
  const tweetEdge = { node: tweetDoc, cursor: tweetDoc.createdAt.toDate().toISOString() };
  return tweetEdge;
};
