import { Firestore } from "firebase-admin/firestore";
import { first } from "lodash";

import { getDocs } from "../query-util/get";
import { likesRef } from "../typed-ref";

export const checkLiked = async (
  db: Firestore,
  { tweetId, userId }: { tweetId: string; userId: string }
) => {
  const likeDocs = await getDocs(
    likesRef(db).where("tweetId", "==", tweetId).where("userId", "==", userId).limit(1)
  );
  const likeDoc = first(likeDocs);
  return likeDoc ? true : false;
};
