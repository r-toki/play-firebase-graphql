import { Firestore, Timestamp } from "firebase-admin/firestore";

import { userTweetsRef } from "../typed-ref";
import { UserTweet } from "./../entity/userTweet";

export const updateTweet = async (
  db: Firestore,
  input: { userId: string; tweetId: string; content: string }
) => {
  const { userId, tweetId, content } = input;
  const data = {
    content,
    updatedAt: Timestamp.now(),
  };
  UserTweet.partial().parse(data);
  await userTweetsRef(db, { userId }).doc(tweetId).set(data, { merge: true });
};
