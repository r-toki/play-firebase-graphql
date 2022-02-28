import { last } from "lodash";

import { Resolvers } from "../../graphql/generated";
import { checkLiked } from "../../lib/query/checkLiked";
import { getFollowers } from "../../lib/query/getFollowers";
import { getFollowings } from "../../lib/query/getFollowings";
import { getLikedUsers } from "../../lib/query/getLikedUsers";
import { getTweets } from "../../lib/query/getTweets";
import { getDoc } from "../../lib/query-util/get";
import { usersRef } from "../../lib/typed-ref";

export const User: Resolvers["User"] = {
  tweets: async (parent, args, context) => {
    const edges = await getTweets(context.db, {
      userId: parent.id,
      first: args.input.first,
      after: args.input.after,
      filters: args.input.filters,
    });
    const pageInfo = { hasNext: edges.length === args.input.first, endCursor: last(edges)?.cursor };
    return { edges, pageInfo };
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
  postedBy: async (parent, args, context) => {
    const userDoc = await getDoc(usersRef(context.db).doc(parent.userId));
    return userDoc;
  },

  likedBy: async (parent, args, context) => {
    const userDocs = getLikedUsers(context.db, { tweetId: parent.id });
    return userDocs;
  },

  liked: async (parent, args, context) => {
    if (!context.uid) return false;
    const liked = await checkLiked(context.db, { tweetId: parent.id, userId: context.uid });
    return liked;
  },
};
