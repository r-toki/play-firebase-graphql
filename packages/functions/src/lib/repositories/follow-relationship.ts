import { Firestore, Timestamp } from "firebase-admin/firestore";
import { first } from "lodash";

import { getDoc, getDocs } from "../query-util/get";
import { followRelationshipsRef, usersRef } from "../typed-ref";

// NOTE: Query
export const getFollowings = async (db: Firestore, { userId }: { userId: string }) => {
  const relationshipDocs = await getDocs(
    followRelationshipsRef(db).where("followerId", "==", userId).orderBy("createdAt", "desc")
  );
  const followingsIds = relationshipDocs.map((v) => v.followedId);
  const followingDocs = Promise.all(followingsIds.map((id) => getDoc(usersRef(db).doc(id))));
  return followingDocs;
};

export const getFollowers = async (db: Firestore, { userId }: { userId: string }) => {
  const relationshipDocs = await getDocs(
    followRelationshipsRef(db).where("followedId", "==", userId).orderBy("createdAt", "desc")
  );
  const followerIds = relationshipDocs.map((v) => v.followerId);
  const followerDocs = Promise.all(followerIds.map((id) => getDoc(usersRef(db).doc(id))));
  return followerDocs;
};

// NOTE: Mutation
export const follow = async (
  db: Firestore,
  { followerId, followedId }: { followerId: string; followedId: string }
) => {
  const relationshipDocs = await getDocs(
    followRelationshipsRef(db)
      .where("followerId", "==", followerId)
      .where("followedId", "==", followedId)
  );
  const relationshipDoc = first(relationshipDocs);
  if (relationshipDoc) return;
  await followRelationshipsRef(db).add({
    followerId: followerId,
    followedId: followedId,
    createdAt: Timestamp.now(),
  });
};

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
