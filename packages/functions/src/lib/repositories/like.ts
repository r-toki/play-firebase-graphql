import { Firestore, Timestamp } from "firebase-admin/firestore";
import { first as firstOfList, orderBy } from "lodash";

import { Edge, execMultiQueriesWithCursor } from "../query-util/exec-multi-queries-with-cursor";
import { getDoc, getDocs } from "../query-util/get";
import { UserTweetDoc } from "../typed-ref/types";
import { likesRef, tweetsRef, usersRef } from "./../typed-ref/index";

// NOTE: Query
export const getFavoriteTweets = async (
  db: Firestore,
  { userId, first, after }: { userId: string; first: number; after: string | null | undefined }
) => {
  const query = async ({ after }: { after: string }) => {
    const likeDocs = await getDocs(
      likesRef(db)
        .where("userId", "==", userId)
        .orderBy("createdAt", "desc")
        .startAfter(Timestamp.fromDate(new Date(after)))
        .limit(1)
    );
    const likeDoc = firstOfList(likeDocs);
    if (!likeDoc) return [];

    const tweetDocs = await getDocs(tweetsRef(db).where("tweetId", "==", likeDoc.tweetId));
    const tweetDoc = firstOfList(tweetDocs);
    if (!tweetDoc) return [];

    return [{ node: tweetDoc, cursor: likeDoc.createdAt.toDate().toISOString() }];
  };

  const order = (edges: Edge<UserTweetDoc>[]) => orderBy(edges, (v) => v.cursor, "desc");

  const edges = await execMultiQueriesWithCursor([query], order, {
    first,
    after: after ?? new Date().toISOString(),
  });

  return edges;
};

export const getLikedUsers = async (db: Firestore, { tweetId }: { tweetId: string }) => {
  const likeDocs = await getDocs(
    likesRef(db).where("tweetId", "==", tweetId).orderBy("createdAt", "desc")
  );
  const userDocs = await Promise.all(
    likeDocs.map((likeDoc) => getDoc(usersRef(db).doc(likeDoc.userId)))
  );
  return userDocs;
};

export const checkLiked = async (
  db: Firestore,
  { tweetId, userId }: { tweetId: string; userId: string }
) => {
  const likeDocs = await getDocs(
    likesRef(db).where("tweetId", "==", tweetId).where("userId", "==", userId).limit(1)
  );
  const likeDoc = firstOfList(likeDocs);
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
  const likeDoc = firstOfList(likeDocs);
  if (likeDoc) throw new Error("likeDoc not found");
  const ref = await likesRef(db).add({ userId, tweetId, createdAt: Timestamp.now() });
  const addedLikeDoc = (await ref.get()).data();
  if (!addedLikeDoc) throw new Error("addedLikeDoc not found");
  return addedLikeDoc;
};

export const unLike = async (
  db: Firestore,
  { userId, tweetId }: { userId: string; tweetId: string }
) => {
  const likeDocs = await getDocs(
    likesRef(db).where("userId", "==", userId).where("tweetId", "==", tweetId)
  );
  const likeDoc = firstOfList(likeDocs);
  if (!likeDoc) throw new Error("likeDoc not found");
  await likeDoc.ref.delete();
  return likeDoc;
};
