import { Firestore } from "firebase-admin/firestore";

import { getSnap } from "../query-util/get";
import { userLikesRef } from "./../typed-ref/index";

export const checkLiked = async (
  db: Firestore,
  { userId, tweetId }: { userId: string; tweetId: string }
) => {
  const likeDoc = await getSnap(userLikesRef(db, { userId }).doc(tweetId));
  return likeDoc.exists;
};
