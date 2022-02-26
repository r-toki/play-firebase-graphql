import { Firestore } from "firebase-admin/firestore";

import { followRelationshipsRef, usersRef } from "../typed-ref";
import { getDoc, getDocs } from "./util/get";

export const getFollowers = async (db: Firestore, { userId }: { userId: string }) => {
  const relationshipDocs = await getDocs(
    followRelationshipsRef(db).where("followedId", "==", userId).orderBy("createdAt", "desc")
  );
  const followerIds = relationshipDocs.map((v) => v.followerId);
  const followerDocs = Promise.all(followerIds.map((id) => getDoc(usersRef(db).doc(id))));
  return followerDocs;
};
