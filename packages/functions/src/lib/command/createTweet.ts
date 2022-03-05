import { Firestore, Timestamp } from "firebase-admin/firestore";
import { v4 } from "uuid";

import { userTweetsRef } from "../typed-ref";

export const createTweet = async (
  db: Firestore,
  { userId, content }: { userId: string; content: string }
) => {
  const id = v4();
  await userTweetsRef(db, { userId }).doc(id).set({
    id,
    content,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    userId,
  });
  return { id };
};
