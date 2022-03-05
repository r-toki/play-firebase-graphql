import { Firestore, Timestamp } from "firebase-admin/firestore";

import { userFollowsRef } from "../typed-ref";

export const follow = async (db: Firestore, input: { followerId: string; followedId: string }) => {
  const { followerId, followedId } = input;
  await userFollowsRef(db, { userId: followerId })
    .doc(followedId)
    .set({ followerId, followedId, createdAt: Timestamp.now() });
};
