import { Firestore, QueryDocumentSnapshot, Timestamp } from "firebase-admin/firestore";
import { UserTweetData } from "interfaces/admin-schema";
import { first, last, orderBy } from "lodash";

import { execMultiQueriesWithCursor } from "../query-util/exec-multi-queries-with-cursor";
import { getDocs } from "../query-util/get";
import { likesRef, tweetsRef } from "./../typed-ref/index";

// NOTE: Query
export const getFavoriteTweets = async (
  db: Firestore,
  { userId, first, after }: { userId: string; first: number; after: string | null | undefined }
) => {
  const likeDocs = await getDocs(likesRef(db).where("userId", "==", userId));

  const queries = likeDocs.map((v) =>
    tweetsRef(db).where("tweetId", "==", v.tweetId).orderBy("createdAt", "desc")
  );
  const order = (snaps: QueryDocumentSnapshot<UserTweetData>[]) =>
    orderBy(snaps, (snap) => snap.data().createdAt, "desc");
  const snaps = await execMultiQueriesWithCursor(queries, order, {
    startAfter: after ? Timestamp.fromDate(new Date(after)) : Timestamp.now(),
    limit: first,
  });

  const tweetDocs = snaps.map((snap) => ({ id: snap.id, ref: snap.ref, ...snap.data() }));
  const tweetEdges = tweetDocs.map((doc) => ({
    node: doc,
    cursor: doc.createdAt.toDate().toISOString(),
  }));
  const pageInfo = { hasNext: tweetDocs.length > 0, endCursor: last(tweetEdges)?.cursor };

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
