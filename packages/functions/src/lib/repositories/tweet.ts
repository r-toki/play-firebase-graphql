import { Firestore, Timestamp } from "firebase-admin/firestore";
import { first as firstOfList, last as lastOfList, orderBy } from "lodash";

import { Edge, execMultiQueriesWithCursor } from "../query-util/exec-multi-queries-with-cursor";
import { getDocs } from "../query-util/get";
import { likesRef, tweetsRef, userTweetsRef } from "../typed-ref";
import { UserTweetDoc } from "../typed-ref/types";

// NOTE: Query
export const getTweet = async (db: Firestore, { id }: { id: string }) => {
  const tweetDocs = await getDocs(tweetsRef(db).where("tweetId", "==", id));
  const tweetDoc = firstOfList(tweetDocs);
  if (!tweetDoc) throw new Error("tweetDoc not found at getTweet");
  return tweetDoc;
};

export const getTweetEdge = async (db: Firestore, { id }: { id: string }) => {
  const tweetDoc = await getTweet(db, { id });
  const tweetEdge = { node: tweetDoc, cursor: tweetDoc.createdAt.toDate().toISOString() };
  return tweetEdge;
};

export const getTweets = async (
  db: Firestore,
  { userId, first, after }: { userId: string; first: number; after: string | null | undefined }
) => {
  const queries = [
    async ({ after }: { after: string }) => {
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
    },

    async ({ after }: { after: string }) => {
      const docs = await getDocs(
        tweetsRef(db)
          .where("userId", "==", userId)
          .orderBy("createdAt", "desc")
          .startAfter(Timestamp.fromDate(new Date(after)))
          .limit(1)
      );
      return docs.map((doc) => ({ node: doc, cursor: doc.createdAt.toDate().toISOString() }));
    },
  ];

  const order = (edges: Edge<UserTweetDoc>[]) => orderBy(edges, (v) => v.cursor, "desc");

  const edges = await execMultiQueriesWithCursor(queries, order, {
    first,
    after: after ?? new Date().toISOString(),
  });

  const pageInfo = { hasNext: edges.length === first, endCursor: lastOfList(edges)?.cursor };

  return { edges, pageInfo };
};

// NOTE: Mutation
export const createTweet = async (
  db: Firestore,
  { userId, tweetId, content }: { userId: string; tweetId: string; content: string }
) => {
  await userTweetsRef(db, { userId }).doc(tweetId).set({
    content,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    tweetId,
    userId,
  });
};

export const updateTweet = async (
  db: Firestore,
  { userId, tweetId, content }: { userId: string; tweetId: string; content: string }
) => {
  await userTweetsRef(db, { userId }).doc(tweetId).set({ content }, { merge: true });
};

export const deleteTweet = async (
  db: Firestore,
  { userId, tweetId }: { userId: string; tweetId: string }
) => {
  await userTweetsRef(db, { userId }).doc(tweetId).delete();
};
