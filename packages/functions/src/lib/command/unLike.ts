import { Firestore } from "firebase-admin/firestore";
import { first } from "lodash";

import { getDocs } from "../query-util/get";
import { likesRef } from "../typed-ref";

export const unLike = async (
  db: Firestore,
  { userId, tweetId }: { userId: string; tweetId: string }
) => {
  const likeDocs = await getDocs(
    likesRef(db).where("userId", "==", userId).where("tweetId", "==", tweetId)
  );
  const likeDoc = first(likeDocs);
  if (!likeDoc) throw new Error("likeDoc not found");
  await likeDoc.ref.delete();
  return likeDoc;
};
