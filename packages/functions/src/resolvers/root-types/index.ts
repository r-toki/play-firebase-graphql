import { Resolvers } from "../../graphql/generated";
import { getDoc, getDocs } from "../../lib/query/util/get";
import { usersRef, userTweetsRef } from "../../lib/typed-ref";

export const User: Resolvers["User"] = {
  tweets: (parent, args, { db }) =>
    getDocs(userTweetsRef(db, { userId: parent.id }).orderBy("createdAt", "desc")),
};

export const Tweet: Resolvers["Tweet"] = {
  creator: (parent, args, { db }) => getDoc(usersRef(db).doc(parent.creatorId)),
};
