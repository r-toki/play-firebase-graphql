import { Firestore } from "firebase-admin/firestore";

import { getDoc, getDocs } from "../query-util/get";
import { usersRef } from "../typed-ref";
import { userFollowsRef } from "./../typed-ref/index";

export const getFollowers = async (db: Firestore, { userId }: { userId: string }) => {
  const userFollowedDocs = await getDocs(
    userFollowsRef(db, { userId }).where("followedId", "==", userId).orderBy("createdAt", "desc")
  );
  const followerIds = userFollowedDocs.map(({ followerId }) => followerId);
  const followerDocs = await Promise.all(followerIds.map((id) => getDoc(usersRef(db).doc(id))));
  return followerDocs;
};
