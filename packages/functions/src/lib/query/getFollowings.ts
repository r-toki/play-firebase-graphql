import { Firestore } from "firebase-admin/firestore";

import { followRelationshipsRef, usersRef } from "../typed-ref";
import { getDoc, getDocs } from "./util/get";

export const getFollowings = async (db: Firestore, { userId }: { userId: string }) => {
  const relationshipDocs = await getDocs(
    followRelationshipsRef(db).where("followerId", "==", userId).orderBy("createdAt", "desc")
  );
  const followingsIds = relationshipDocs.map((v) => v.followedId);
  const followingDocs = Promise.all(followingsIds.map((id) => getDoc(usersRef(db).doc(id))));
  return followingDocs;
};
