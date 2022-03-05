import { Firestore } from "firebase-admin/firestore";

import { getDoc, getDocs } from "../query-util/get";
import { userFollowsRef, usersRef } from "../typed-ref";

export const getFollowings = async (db: Firestore, { userId }: { userId: string }) => {
  const userFollowDocs = await getDocs(userFollowsRef(db, { userId }));
  const followingIds = userFollowDocs.map(({ id }) => id);
  const followingDocs = await Promise.all(followingIds.map((id) => getDoc(usersRef(db).doc(id))));
  return followingDocs;
};
