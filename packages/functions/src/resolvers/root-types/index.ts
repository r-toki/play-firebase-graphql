import { last } from "lodash";

import { Resolvers } from "../../graphql/generated";
import { getDoc } from "../../lib/query-util/get";
import { getFeed } from "../../lib/repositories/feed";
import { getFollowers, getFollowings } from "../../lib/repositories/follow-relationship";
import { getTweets } from "../../lib/repositories/tweet";
import { usersRef } from "../../lib/typed-ref";
import { checkLiked, getFavoriteTweets, getLikedUsers } from "./../../lib/repositories/like";

export const User: Resolvers["User"] = {
  tweets: async (parent, args, context) => {
    const edges = await getTweets(context.db, {
      userId: parent.id,
      first: args.input.first,
      after: args.input.after,
    });
    const pageInfo = { hasNext: edges.length === args.input.first, endCursor: last(edges)?.cursor };
    return { edges, pageInfo };
  },

  feed: async (parent, args, context) => {
    const edges = await getFeed(context.db, {
      userId: parent.id,
      first: args.input.first,
      after: args.input.after,
    });
    const pageInfo = { hasNext: edges.length === args.input.first, endCursor: last(edges)?.cursor };
    return { edges, pageInfo };
  },

  favoriteTweets: async (parent, args, context) => {
    const edges = await getFavoriteTweets(context.db, {
      userId: parent.id,
      first: args.input.first,
      after: args.input.after,
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
