import { db } from "../../firebase-app";
import { Resolvers } from "../../graphql/generated";
import { getDoc } from "../../lib/query-util/get";
import { getFeed } from "../../lib/repositories/feed";
import { getFollowers, getFollowings } from "../../lib/repositories/follow-relationship";
import { getTweets } from "../../lib/repositories/tweet";
import { usersRef } from "../../lib/typed-ref";
import { checkLiked, getFavoriteTweets, getLikedUsers } from "./../../lib/repositories/like";

export const User: Resolvers["User"] = {
  tweets: async (parent, args, context) => {
    const tweetConnection = await getTweets(context.db, {
      userId: parent.id,
      first: args.input.first,
      after: args.input.after,
    });
    return tweetConnection;
  },

  feed: async (parent, args, context) => {
    const tweetConnection = await getFeed(context.db, {
      userId: parent.id,
      first: args.input.first,
      after: args.input.after,
    });
    return tweetConnection;
  },

  favoriteTweets: async (parent, args, context) => {
    const tweetConnection = await getFavoriteTweets(context.db, {
      userId: parent.id,
      first: args.input.first,
      after: args.input.after,
    });
    return tweetConnection;
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
    const liked = await checkLiked(db, { tweetId: parent.id, userId: context.uid });
    return liked;
  },
};
