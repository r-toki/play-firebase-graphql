import { Firestore } from "firebase-admin/firestore";

import { userTweetsRef } from "../typed-ref";

export const deleteTweet = async (
  db: Firestore,
  { userId, id }: { userId: string; id: string }
) => {
  await userTweetsRef(db, { userId }).doc(id).delete();
};
