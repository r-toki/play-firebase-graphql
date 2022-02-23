import { Resolvers } from "../../graphql/generated";
import { getDoc, getDocs } from "../../lib/query/util/get";
import { usersRef, userTweetsRef } from "../../lib/typed-ref";
import { followingsRef } from "./../../lib/typed-ref/index";

export const User: Resolvers["User"] = {
  tweets: (parent, args, { db }) =>
    getDocs(userTweetsRef(db, { userId: parent.id }).orderBy("createdAt", "desc")),
  followings: async (parent, args, { db }) => {
    const followings = await getDocs(followingsRef(db).where("followerId", "==", parent.id));
    const followedIds = followings.map((v) => v.followedId);
    return Promise.all(followedIds.map((id) => getDoc(usersRef(db).doc(id))));
  },
};

export const Tweet: Resolvers["Tweet"] = {
  creator: (parent, args, { db }) => getDoc(usersRef(db).doc(parent.creatorId)),
};
