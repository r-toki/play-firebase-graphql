import { Firestore, Timestamp } from "firebase-admin/firestore";
import { UserTweetDoc } from "interfaces/admin-schema";
import { orderBy } from "lodash";

import { Edge, execMultiQueriesWithCursor } from "../query-util/exec-multi-queries-with-cursor";
import { getDocs } from "../query-util/get";
import { followRelationshipsRef, tweetsRef } from "../typed-ref";

// NOTE: Query
export const getFeed = async (
  db: Firestore,
  { userId, first, after }: { userId: string; first: number; after: string | null | undefined }
) => {
  const relationshipDocs = await getDocs(
    followRelationshipsRef(db).where("followerId", "==", userId)
  );

  const queries = [userId, ...relationshipDocs.map((v) => v.followedId)].map(
    (id) =>
      async ({ after }: { after: string }) => {
        const docs = await getDocs(
          tweetsRef(db)
            .where("userId", "==", id)
            .orderBy("createdAt", "desc")
            .startAfter(Timestamp.fromDate(new Date(after)))
            .limit(1)
        );
        return docs.map((doc) => ({ node: doc, cursor: doc.createdAt.toDate().toISOString() }));
      }
  );

  const order = (edges: Edge<UserTweetDoc>[]) => orderBy(edges, (v) => v.cursor, "desc");

  const edges = await execMultiQueriesWithCursor(queries, order, {
    first,
    after: after ?? new Date().toISOString(),
  });

  return edges;
};
