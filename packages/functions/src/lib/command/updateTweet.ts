import { Firestore } from "firebase-admin/firestore";

import { userTweetsRef } from "../typed-ref";

export const updateTweet = async (
  db: Firestore,
  { userId, tweetId, content }: { userId: string; tweetId: string; content: string }
) => {
  await userTweetsRef(db, { userId }).doc(tweetId).set({ content }, { merge: true });
};
