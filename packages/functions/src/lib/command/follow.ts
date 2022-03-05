import { Firestore, Timestamp } from "firebase-admin/firestore";

import { userFollowsRef } from "../typed-ref";

export const follow = async (
  db: Firestore,
  { followerId, followedId }: { followerId: string; followedId: string }
) => {
  await userFollowsRef(db, { userId: followerId })
    .doc(followedId)
    .set({ createdAt: Timestamp.now(), followerId, followedId });
};
