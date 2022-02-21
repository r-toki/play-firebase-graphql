import { Query, QueryDocumentSnapshot } from "firebase-admin/firestore";
import { getSnaps } from "./get";

export const multiQueriesWithCursor = async <T, U>(
  queries: Query<T>[],
  order: (docs: QueryDocumentSnapshot<T>[]) => QueryDocumentSnapshot<T>[],
  { startAfter, limit }: { startAfter: U; limit: number }
) => {
  const res: QueryDocumentSnapshot<T>[] = [];

  let candidates = await Promise.all(
    queries.map((query) => getSnaps(query.startAfter(startAfter).limit(1)))
  );

  let i = 0;
  while (i < limit) {
    const [headSnap, ...restSnaps] = order(candidates.flat());
    if (!headSnap) return res;
    res.push(headSnap);
    candidates = restSnaps.map((v) => [v]);
    const headIndex = candidates.findIndex(([snap]) => snap === headSnap);
    const headQuery = queries[headIndex];
    const candidate = await getSnaps(headQuery.startAfter(headSnap).limit(1));
    candidates.push(candidate);
    i++;
  }

  return res;
};
