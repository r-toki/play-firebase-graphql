import { Firestore } from "firebase-admin/firestore";
import { first } from "lodash";

import { getDocs } from "../query-util/get";
import { likesRef } from "../typed-ref";

export const checkLiked = async (
  db: Firestore,
  { userId, tweetId }: { userId: string; tweetId: string }
) => {
  const likeDocs = await getDocs(
    likesRef(db).where("userId", "==", userId).where("tweetId", "==", tweetId).limit(1)
  );
  const likeDoc = first(likeDocs);
  return likeDoc ? true : false;
};
