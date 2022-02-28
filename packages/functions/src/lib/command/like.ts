import { Firestore, Timestamp } from "firebase-admin/firestore";
import { first } from "lodash";

import { getDocs } from "../query-util/get";
import { likesRef } from "../typed-ref";

export const like = async (
  db: Firestore,
  { userId, tweetId }: { userId: string; tweetId: string }
) => {
  const likeDocs = await getDocs(
    likesRef(db).where("userId", "==", userId).where("tweetId", "==", tweetId)
  );
  const likeDoc = first(likeDocs);
  if (likeDoc) throw new Error("likeDoc not found");
  const ref = await likesRef(db).add({ userId, tweetId, createdAt: Timestamp.now() });
  const addedLikeDoc = (await ref.get()).data();
  if (!addedLikeDoc) throw new Error("addedLikeDoc not found");
  return addedLikeDoc;
};
