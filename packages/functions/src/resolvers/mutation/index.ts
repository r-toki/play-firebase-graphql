import { Timestamp } from "firebase-admin/firestore";
import { first } from "lodash";

import { Resolvers } from "../../graphql/generated";
import { getDoc, getDocs } from "../../lib/query/util/get";
import { followRelationshipsRef, usersRef } from "../../lib/typed-ref";
import { userTweetsRef } from "./../../lib/typed-ref/index";

export const Mutation: Resolvers["Mutation"] = {
  updateProfile: async (parent, args, { decodedIdToken, db }) => {
    if (!decodedIdToken) throw new Error("");

    const { uid } = decodedIdToken;

    await usersRef(db).doc(uid).set(
      {
        displayName: args.input.displayName,
        updatedAt: Timestamp.now(),
      },
      { merge: true }
    );

    return getDoc(usersRef(db).doc(uid));
  },
  createTweet: async (parent, args, { decodedIdToken, db }) => {
    if (!decodedIdToken) throw new Error("");

    const { uid } = decodedIdToken;

    const ref = await userTweetsRef(db, { userId: uid }).add({
      content: args.input.content,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      creatorId: uid,
    });

    return getDoc(userTweetsRef(db, { userId: uid }).doc(ref.id));
  },
  follow: async (parent, args, { decodedIdToken, db }) => {
    if (!decodedIdToken) throw new Error("");

    const { uid } = decodedIdToken;
    const { followedId } = args.input;

    const relationshipDocs = await getDocs(
      followRelationshipsRef(db)
        .where("followerId", "==", uid)
        .where("followedId", "==", followedId)
    );

    const relationshipDoc = first(relationshipDocs);

    if (relationshipDoc) return getDoc(usersRef(db).doc(uid));

    await followRelationshipsRef(db).add({
      followedId,
      followerId: uid,
      createdAt: Timestamp.now(),
    });

    return getDoc(usersRef(db).doc(uid));
  },
  unFollow: async (parent, args, { decodedIdToken, db }) => {
    if (!decodedIdToken) throw new Error("");

    const { uid } = decodedIdToken;
    const { followedId } = args.input;

    const relationshipDocs = await getDocs(
      followRelationshipsRef(db)
        .where("followerId", "==", uid)
        .where("followedId", "==", followedId)
    );

    const relationshipDoc = first(relationshipDocs);

    if (!relationshipDoc) return getDoc(usersRef(db).doc(uid));

    await relationshipDoc.ref.delete();

    return getDoc(usersRef(db).doc(uid));
  },
};
