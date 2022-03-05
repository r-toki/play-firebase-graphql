import { Firestore, Timestamp } from "firebase-admin/firestore";

import { User } from "../entity/user";
import { usersRef } from "../typed-ref";

export const updateUser = async (db: Firestore, input: { userId: string; displayName: string }) => {
  const { userId, displayName } = input;
  const data = {
    displayName,
    updatedAt: Timestamp.now(),
  };
  User.partial().parse(data);
  await usersRef(db).doc(userId).set(data, { merge: true });
};
