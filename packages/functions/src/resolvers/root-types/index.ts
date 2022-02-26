import { Resolvers } from "../../graphql/generated";
import { getDoc, getDocs } from "../../lib/query-util/get";
import { getFollowers, getFollowings } from "../../lib/repositories/follow-relationship";
import { usersRef, userTweetsRef } from "../../lib/typed-ref";

export const User: Resolvers["User"] = {
  tweets: async (parent, args, context) => {
    const tweetDocs = await getDocs(
      userTweetsRef(context.db, { userId: parent.id }).orderBy("createdAt", "desc")
    );
    return tweetDocs;
  },

  followings: async (parent, args, context) => {
    const followingDocs = await getFollowings(context.db, { userId: parent.id });
    return followingDocs;
  },

  followers: async (parent, args, context) => {
    const followerDocs = await getFollowers(context.db, { userId: parent.id });
    return followerDocs;
  },
};

export const Tweet: Resolvers["Tweet"] = {
  creator: async (parent, args, context) => {
    const creator = await getDoc(usersRef(context.db).doc(parent.creatorId));
    return creator;
  },
};
