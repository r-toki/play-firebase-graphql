import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { first } from "lodash";
import { v4 } from "uuid";

import { Resolvers } from "../../graphql/generated";
import { isSignedIn } from "../../lib/authorization";
import { getDoc, getDocs } from "../../lib/query/util/get";
import { followRelationshipsRef, usersRef } from "../../lib/typed-ref";
import { userTweetsRef } from "./../../lib/typed-ref/index";

export const Mutation: Resolvers["Mutation"] = {
  updateProfile: async (parent, args, context) => {
    isSignedIn(context);

    const { input } = args;
    const {
      decodedIdToken: { uid },
      db,
    } = context;

    await usersRef(db).doc(uid).set(
      {
        displayName: input.displayName,
        updatedAt: Timestamp.now(),
      },
      { merge: true }
    );

    return getDoc(usersRef(db).doc(uid));
  },

  createTweet: async (parent, args, context) => {
    isSignedIn(context);

    const { input } = args;
    const {
      decodedIdToken: { uid },
      db,
    } = context;

    const tweetId = v4();
    await userTweetsRef(db, { userId: uid })
      .doc(tweetId)
      .set({
        content: input.content,
        createdAt: FieldValue.serverTimestamp() as Timestamp,
        updatedAt: FieldValue.serverTimestamp() as Timestamp,
        tweetId,
        creatorId: uid,
      });
    const tweet = getDoc(userTweetsRef(db, { userId: uid }).doc(tweetId));

    return tweet;
  },

  follow: async (parent, args, context) => {
    isSignedIn(context);

    const { input } = args;
    const {
      decodedIdToken: { uid },
      db,
    } = context;

    const relationshipDocs = await getDocs(
      followRelationshipsRef(db)
        .where("followerId", "==", uid)
        .where("followedId", "==", input.followedId)
    );
    const relationshipDoc = first(relationshipDocs);
    if (relationshipDoc) return getDoc(usersRef(db).doc(uid));
    await followRelationshipsRef(db).add({
      followedId: input.followedId,
      followerId: uid,
      createdAt: Timestamp.now(),
    });
    const me = getDoc(usersRef(db).doc(uid));

    return me;
  },

  unFollow: async (parent, args, context) => {
    isSignedIn(context);

    const { input } = args;
    const {
      decodedIdToken: { uid },
      db,
    } = context;

    const relationshipDocs = await getDocs(
      followRelationshipsRef(db)
        .where("followerId", "==", uid)
        .where("followedId", "==", input.followedId)
    );
    const relationshipDoc = first(relationshipDocs);
    if (!relationshipDoc) return getDoc(usersRef(db).doc(uid));
    await relationshipDoc.ref.delete();
    return getDoc(usersRef(db).doc(uid));
  },
};
