import { QueryDocumentSnapshot, Timestamp } from "firebase-admin/firestore";
import { last, orderBy } from "lodash";

import { followRelationshipsRef, tweetsRef } from "../typed-ref";
import { UserTweetData } from "../typed-ref/types";
import { QueryFeedArgs } from "./../../../../client/src/graphql/generated";
import { AuthedContext } from "./../../context";
import { execMultiQueriesWithCursor } from "./util/exec-multi-queries-with-cursor";
import { getDocs } from "./util/get";

export const getFeed = async (args: QueryFeedArgs, context: AuthedContext) => {
  const { first, after } = args;
  const {
    decodedIdToken: { uid },
    db,
  } = context;

  const relationshipDocs = await getDocs(followRelationshipsRef(db).where("followerId", "==", uid));

  const queries = [uid, ...relationshipDocs.map((v) => v.followedId)].map((id) =>
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
