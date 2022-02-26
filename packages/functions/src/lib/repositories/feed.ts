import { Firestore, QueryDocumentSnapshot, Timestamp } from "firebase-admin/firestore";
import { UserTweetData } from "interfaces/admin-schema";
import { last, orderBy } from "lodash";

import { execMultiQueriesWithCursor } from "../query/util/exec-multi-queries-with-cursor";
import { getDocs } from "../query/util/get";
import { followRelationshipsRef, tweetsRef } from "../typed-ref";

export const getFeed = async (
  db: Firestore,
  { userId, first, after }: { userId: string; first: number; after: string | null | undefined }
) => {
  const relationshipDocs = await getDocs(
    followRelationshipsRef(db).where("followerId", "==", userId)
  );

  const queries = [userId, ...relationshipDocs.map((v) => v.followedId)].map((id) =>
    tweetsRef(db).where("creatorId", "==", id).orderBy("createdAt", "desc")
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
