import { Firestore } from "firebase-admin/firestore";

import { getDoc, getDocs } from "../query-util/get";
import { followRelationshipsRef, usersRef } from "../typed-ref";

export const getFollowers = async (db: Firestore, { userId }: { userId: string }) => {
  const relationshipDocs = await getDocs(
    followRelationshipsRef(db).where("followedId", "==", userId).orderBy("createdAt", "desc")
  );
  const followerIds = relationshipDocs.map((v) => v.followerId);
  const followerDocs = await Promise.all(followerIds.map((id) => getDoc(usersRef(db).doc(id))));
  return followerDocs;
};
