import { Firestore, Timestamp } from "firebase-admin/firestore";
import { v4 } from "uuid";

import { userTweetsRef } from "../typed-ref";

export const createTweet = async (
  db: Firestore,
  { userId, content }: { userId: string; content: string }
) => {
  const tweetId = v4();
  await userTweetsRef(db, { userId }).doc(tweetId).set({
    content,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    tweetId,
    userId,
  });
  return { id: tweetId };
};
