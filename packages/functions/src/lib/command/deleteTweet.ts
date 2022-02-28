import { Firestore } from "firebase-admin/firestore";

import { userTweetsRef } from "../typed-ref";

export const deleteTweet = async (
  db: Firestore,
  { userId, tweetId }: { userId: string; tweetId: string }
) => {
  await userTweetsRef(db, { userId }).doc(tweetId).delete();
};
