import { first as firstOfList, uniqBy } from "lodash";

export type Edge<T> = {
  node: T;
  cursor: string;
};

export const execMultiQueriesWithCursor = async <T extends { id: string }>(
  queries: (({ after }: { after: string }) => Promise<Edge<T>[]>)[],
  order: (edges: Edge<T>[]) => Edge<T>[],
  { first, after }: { first: number; after: string }
): Promise<Edge<T>[]> => {
  let res: Edge<T>[] = [];

  const candidatesList = await Promise.all(queries.map((query) => query({ after })));

  let i = 0;
  while (i < first) {
    const head = firstOfList(order(candidatesList.flat()));
    if (!head) return res;
    res = uniqBy([...res, head], (v) => v.node.id);
    const headIndex = candidatesList.findIndex((edges) => firstOfList(edges) === head);
    if (headIndex < 0 || queries.length < headIndex) throw new Error("not found headIndex");
    const headQuery = queries[headIndex];
    const newCandidates = await headQuery({ after: head.cursor });
    candidatesList[headIndex] = newCandidates;
    i++;
  }

  return res;
};
