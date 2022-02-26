import { Firestore, Timestamp } from "firebase-admin/firestore";

import { usersRef } from "../typed-ref";

// Note: Mutation
export const updateUser = async (
  db: Firestore,
  { userId, displayName }: { userId: string; displayName: string }
) => {
  await usersRef(db).doc(userId).set(
    {
      displayName: displayName,
      updatedAt: Timestamp.now(),
    },
    { merge: true }
  );
};
