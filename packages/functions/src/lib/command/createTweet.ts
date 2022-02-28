import { Firestore, Timestamp } from "firebase-admin/firestore";

import { userTweetsRef } from "../typed-ref";

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
