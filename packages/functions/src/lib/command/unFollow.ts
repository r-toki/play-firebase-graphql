import { Firestore } from "firebase-admin/firestore";
import { first } from "lodash";

import { getDocs } from "../query-util/get";
import { followRelationshipsRef } from "../typed-ref";

export const unFollow = async (
  db: Firestore,
  { followerId, followedId }: { followerId: string; followedId: string }
) => {
  const relationshipDocs = await getDocs(
    followRelationshipsRef(db)
      .where("followerId", "==", followerId)
      .where("followedId", "==", followedId)
  );
  const relationshipDoc = first(relationshipDocs);
  if (!relationshipDoc) return;
  await relationshipDoc.ref.delete();
};
