import { Firestore } from "firebase-admin/firestore";

import { userFollowsRef } from "../typed-ref";

export const unFollow = async (
  db: Firestore,
  { followerId, followedId }: { followerId: string; followedId: string }
) => {
  await userFollowsRef(db, { userId: followerId }).doc(followedId).delete();
};
