import { Firestore } from "firebase-admin/firestore";

import { userLikesRef } from "../typed-ref";

export const unLike = async (
  db: Firestore,
  { userId, tweetId }: { userId: string; tweetId: string }
) => {
  await userLikesRef(db, { userId }).doc(tweetId).delete();
};
