import { Firestore, Timestamp } from "firebase-admin/firestore";

import { userLikesRef } from "../typed-ref";

export const like = async (
  db: Firestore,
  { userId, tweetId }: { userId: string; tweetId: string }
) => {
  await userLikesRef(db, { userId })
    .doc(tweetId)
    .set({ createdAt: Timestamp.now(), userId, tweetId });
};
