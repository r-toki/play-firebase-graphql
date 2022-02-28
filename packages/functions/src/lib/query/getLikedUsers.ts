import { Firestore } from "firebase-admin/firestore";

import { getDoc, getDocs } from "../query-util/get";
import { likesRef, usersRef } from "../typed-ref";

export const getLikedUsers = async (db: Firestore, { tweetId }: { tweetId: string }) => {
  const likeDocs = await getDocs(
    likesRef(db).where("tweetId", "==", tweetId).orderBy("createdAt", "desc")
  );
  const userDocs = await Promise.all(
    likeDocs.map((likeDoc) => getDoc(usersRef(db).doc(likeDoc.userId)))
  );
  return userDocs;
};
