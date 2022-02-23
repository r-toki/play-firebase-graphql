import { Timestamp } from "firebase-admin/firestore";

import { Resolvers } from "../../graphql/generated";
import { getDoc } from "../../lib/query/util/get";
import { usersRef } from "../../lib/typed-ref";
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
};
