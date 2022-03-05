import { Firestore, Timestamp } from "firebase-admin/firestore";

import { userLikesRef } from "../typed-ref";

export const like = async (db: Firestore, input: { userId: string; tweetId: string }) => {
  const { userId, tweetId } = input;
  await userLikesRef(db, { userId })
    .doc(tweetId)
    .set({ createdAt: Timestamp.now(), userId, tweetId });
};
