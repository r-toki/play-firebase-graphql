import { Firestore } from "firebase-admin/firestore";

import { userTweetsRef } from "../typed-ref";

export const updateTweet = async (
  db: Firestore,
  input: { userId: string; tweetId: string; content: string }
) => {
  const { userId, tweetId, content } = input;
  await userTweetsRef(db, { userId }).doc(tweetId).set({ content }, { merge: true });
};
