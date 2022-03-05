import { Firestore } from "firebase-admin/firestore";

import { userFollowsRef } from "../typed-ref";

export const unFollow = async (
  db: Firestore,
  input: { followerId: string; followedId: string }
) => {
  const { followerId, followedId } = input;
  await userFollowsRef(db, { userId: followerId }).doc(followedId).delete();
};
