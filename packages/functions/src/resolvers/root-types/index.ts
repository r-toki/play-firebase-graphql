import { Resolvers } from "../../graphql/generated";
import { getDoc, getDocs } from "../../lib/query/util/get";
import { usersRef, userTweetsRef } from "../../lib/typed-ref";
import { followRelationshipsRef } from "./../../lib/typed-ref/index";

export const User: Resolvers["User"] = {
  tweets: (parent, args, { db }) =>
    getDocs(userTweetsRef(db, { userId: parent.id }).orderBy("createdAt", "desc")),
  followings: async (parent, args, { db }) => {
    const relationships = await getDocs(
      followRelationshipsRef(db).where("followerId", "==", parent.id).orderBy("createdAt", "desc")
    );
    const followingsIds = relationships.map((v) => v.followedId);
    return Promise.all(followingsIds.map((id) => getDoc(usersRef(db).doc(id))));
  },
  followers: async (parent, args, { db }) => {
    const relationships = await getDocs(
      followRelationshipsRef(db).where("followedId", "==", parent.id).orderBy("createdAt", "desc")
    );
    const followerIds = relationships.map((v) => v.followedId);
    return Promise.all(followerIds.map((id) => getDoc(usersRef(db).doc(id))));
  },
};

export const Tweet: Resolvers["Tweet"] = {
  creator: (parent, args, { db }) => getDoc(usersRef(db).doc(parent.creatorId)),
};
