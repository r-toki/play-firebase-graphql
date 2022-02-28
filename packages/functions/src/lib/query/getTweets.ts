import { Firestore, Timestamp } from "firebase-admin/firestore";
import { first as head, orderBy } from "lodash";

import { Edge } from "../query-util/exec-multi-queries-with-cursor";
import { getDocs } from "../query-util/get";
import { likesRef, tweetsRef } from "../typed-ref";
import { UserTweetDoc } from "../typed-ref/types";
import { Tweet_Filter } from "./../../graphql/generated";
import { execMultiQueriesWithCursor } from "./../query-util/exec-multi-queries-with-cursor";
import { followRelationshipsRef } from "./../typed-ref/index";

type GetTweetsInput = {
  userId: string;
  first: number;
  after: string | null | undefined;
  filters: Tweet_Filter[];
};

export const getTweets = async (
  db: Firestore,
  { userId, first, after, filters }: GetTweetsInput
) => {
  const queries = [];

  if (filters.includes("SELF")) {
    const query = async ({ after }: { after: string }) => {
      const tweetDocs = await getDocs(
        tweetsRef(db)
          .where("userId", "==", userId)
          .orderBy("createdAt", "desc")
          .startAfter(Timestamp.fromDate(new Date(after)))
          .limit(1)
      );
      return tweetDocs.map((doc) => ({ node: doc, cursor: doc.createdAt.toDate().toISOString() }));
    };

    queries.push(query);
  }

  if (filters.includes("FOLLOWINGS")) {
    const followRelationshipDocs = await getDocs(
      followRelationshipsRef(db).where("followerId", "==", userId)
    );
    const followingIds = followRelationshipDocs.map((doc) => doc.followedId);

    for (const followingId of followingIds) {
      const query = async ({ after }: { after: string }) => {
        const tweetDocs = await getDocs(
          tweetsRef(db)
            .where("userId", "==", followingId)
            .orderBy("createdAt", "desc")
            .startAfter(Timestamp.fromDate(new Date(after)))
            .limit(1)
        );
        return tweetDocs.map((doc) => ({
          node: doc,
          cursor: doc.createdAt.toDate().toISOString(),
        }));
      };

      queries.push(query);
    }
  }

  if (filters.includes("LIKES")) {
    const query = async ({ after }: { after: string }) => {
      const likeDocs = await getDocs(
        likesRef(db)
          .where("userId", "==", userId)
          .orderBy("createdAt", "desc")
          .startAfter(Timestamp.fromDate(new Date(after)))
          .limit(1)
      );
      const likeDoc = head(likeDocs);
      if (!likeDoc) return [];

      const tweetDocs = await getDocs(tweetsRef(db).where("tweetId", "==", likeDoc.tweetId));
      const tweetDoc = head(tweetDocs);
      if (!tweetDoc) return [];

      return [{ node: tweetDoc, cursor: likeDoc.createdAt.toDate().toISOString() }];
    };

    queries.push(query);
  }

  const order = (edges: Edge<UserTweetDoc>[]) => orderBy(edges, (edge) => edge.cursor, "desc");

  const edges = await execMultiQueriesWithCursor(queries, order, {
    first,
    after: after ?? new Date().toISOString(),
  });

  return edges;
};
