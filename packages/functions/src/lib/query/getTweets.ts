import { Firestore, Timestamp } from "firebase-admin/firestore";
import { chunk, first as head, orderBy } from "lodash";

import { Edge } from "../query-util/exec-multi-queries-with-cursor";
import { getDocs } from "../query-util/get";
import { likesRef, tweetsRef, userLikesRef } from "../typed-ref";
import { UserTweetDoc } from "../typed-ref/types";
import { Tweet_Filter } from "./../../graphql/generated";
import { execMultiQueriesWithCursor } from "./../query-util/exec-multi-queries-with-cursor";
import { getFollowings } from "./getFollowings";

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
    const followingDocs = await getFollowings(db, { userId });
    const followingIds = followingDocs.map(({ id }) => id);

    for (const chunkedFollowingIds of chunk(followingIds, 10)) {
      const query = async ({ after }: { after: string }) => {
        const tweetDocs = await getDocs(
          tweetsRef(db)
            .where("userId", "in", chunkedFollowingIds)
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
        userLikesRef(db, { userId })
          .orderBy("createdAt", "desc")
          .startAfter(Timestamp.fromDate(new Date(after)))
          .limit(1)
      );
      const likeDoc = head(likeDocs);
      if (!likeDoc) return [];

      const tweetDocs = await getDocs(tweetsRef(db).where("id", "==", likeDoc.tweetId));
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
