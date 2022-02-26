import { Resolvers } from "../../graphql/generated";
import { getDoc, getDocs } from "../../lib/query/util/get";
import { usersRef, userTweetsRef } from "../../lib/typed-ref";
import { followRelationshipsRef } from "./../../lib/typed-ref/index";

export const User: Resolvers["User"] = {
  tweets: (parent, args, context) =>
    getDocs(userTweetsRef(context.db, { userId: parent.id }).orderBy("createdAt", "desc")),

  followings: async (parent, args, context) => {
    const relationships = await getDocs(
      followRelationshipsRef(context.db)
        .where("followerId", "==", parent.id)
        .orderBy("createdAt", "desc")
    );
    const followingsIds = relationships.map((v) => v.followedId);
    return Promise.all(followingsIds.map((id) => getDoc(usersRef(context.db).doc(id))));
  },

  followers: async (parent, args, context) => {
    const relationships = await getDocs(
      followRelationshipsRef(context.db)
        .where("followedId", "==", parent.id)
        .orderBy("createdAt", "desc")
    );
    const followerIds = relationships.map((v) => v.followedId);
    return Promise.all(followerIds.map((id) => getDoc(usersRef(context.db).doc(id))));
  },
};

export const Tweet: Resolvers["Tweet"] = {
  creator: (parent, args, context) => getDoc(usersRef(context.db).doc(parent.creatorId)),
};
