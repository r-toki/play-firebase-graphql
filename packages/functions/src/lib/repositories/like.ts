import { Firestore, Timestamp } from "firebase-admin/firestore";
import { first, last } from "lodash";

import { getDocs } from "../query-util/get";
import { likesRef, tweetsRef } from "./../typed-ref/index";

// NOTE: Query
export const getFavoriteTweets = async (
  db: Firestore,
  { userId, first, after }: { userId: string; first: number; after: string | null | undefined }
) => {
  const likeDocs = await getDocs(
    likesRef(db)
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .startAfter(after ? Timestamp.fromDate(new Date(after)) : Timestamp.now())
      .limit(first)
  );

  const tweetDocsList = await Promise.all(
    likeDocs.map((v) => getDocs(tweetsRef(db).where("tweetId", "==", v.tweetId)))
  );

  const tweetEdges = tweetDocsList.flat().map((doc, idx) => ({
    node: doc,
    cursor: likeDocs[idx].createdAt.toDate().toISOString(),
  }));
  const pageInfo = { hasNext: tweetEdges.length === first, endCursor: last(tweetEdges)?.cursor };

  return { edges: tweetEdges, pageInfo };
};

export const getFavorite = async (
  db: Firestore,
  { userId, tweetId }: { userId: string; tweetId: string }
) => {
  const likeDocs = await getDocs(
    likesRef(db).where("userId", "==", userId).where("tweetId", "==", tweetId)
  );
  const likeDoc = first(likeDocs);
  return likeDoc ? true : false;
};

// NOTE: Mutation
export const like = async (
  db: Firestore,
  { userId, tweetId }: { userId: string; tweetId: string }
) => {
  const likeDocs = await getDocs(
    likesRef(db).where("userId", "==", userId).where("tweetId", "==", tweetId)
  );
  const likeDoc = first(likeDocs);
  if (likeDoc) return;
  await likesRef(db).add({ userId, tweetId, createdAt: Timestamp.now() });
};

export const unLike = async (
  db: Firestore,
  { userId, tweetId }: { userId: string; tweetId: string }
) => {
  const likeDocs = await getDocs(
    likesRef(db).where("userId", "==", userId).where("tweetId", "==", tweetId)
  );
  const likeDoc = first(likeDocs);
  if (!likeDoc) return;
  await likeDoc.ref.delete();
};
