import { Timestamp } from "firebase-admin/firestore";

import { Resolvers } from "../../graphql/generated";
import { getDoc } from "../../lib/query/util/get";
import { usersRef } from "../../lib/typed-ref";

export const Mutation: Resolvers["Mutation"] = {
  updateProfile: async (parent, args, { db }) => {
    await usersRef(db).doc(args.id).set(
      {
        displayName: args.input.displayName,
        updatedAt: Timestamp.now(),
      },
      { merge: true }
    );
    return getDoc(usersRef(db).doc(args.id));
  },
};
