import { Firestore } from "firebase-admin/firestore";

import { userLikesRef } from "../typed-ref";

export const unLike = async (db: Firestore, input: { userId: string; tweetId: string }) => {
  const { userId, tweetId } = input;
  await userLikesRef(db, { userId }).doc(tweetId).delete();
};
