import { Firestore } from "firebase-admin/firestore";

import { userTweetsRef } from "../typed-ref";

export const deleteTweet = async (db: Firestore, input: { userId: string; id: string }) => {
  const { userId, id } = input;
  await userTweetsRef(db, { userId }).doc(id).delete();
};
