import { Firestore, Timestamp } from "firebase-admin/firestore";
import { v4 } from "uuid";

import { UserTweet } from "../entity/userTweet";
import { userTweetsRef } from "../typed-ref";

export const createTweet = async (db: Firestore, input: { userId: string; content: string }) => {
  const { userId, content } = input;
  const id = v4();
  const data = {
    id,
    userId,
    content,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  };
  UserTweet.parse(data);
  await userTweetsRef(db, { userId }).doc(id).set(data);
  return { id };
};
