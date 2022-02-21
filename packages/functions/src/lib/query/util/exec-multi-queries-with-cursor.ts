import { Query, QueryDocumentSnapshot } from "firebase-admin/firestore";
import { first } from "lodash";

import { getSnaps } from "./get";

export const execMultiQueriesWithCursor = async <T, U>(
  queries: Query<T>[],
  order: (snaps: QueryDocumentSnapshot<T>[]) => QueryDocumentSnapshot<T>[],
  { startAfter, limit }: { startAfter: U; limit: number }
) => {
  const res: QueryDocumentSnapshot<T>[] = [];

  const candidatesSnaps = await Promise.all(
    queries.map((query) => getSnaps(query.startAfter(startAfter).limit(1)))
  );

  let i = 0;
  while (i < limit) {
    const headSnap = first(order(candidatesSnaps.flat()));
    if (!headSnap) return res;
    res.push(headSnap);
    const headIndex = candidatesSnaps.findIndex((snaps) => first(snaps) === headSnap);
    const headQuery = queries[headIndex];
    const newCandidateSnaps = await getSnaps(headQuery.startAfter(headSnap).limit(1));
    candidatesSnaps[headIndex] = newCandidateSnaps;
    i++;
  }

  return res;
};
