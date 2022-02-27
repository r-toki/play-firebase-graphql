import { Resolvers } from "../../graphql/generated";
import { getFeed } from "../../lib/repositories/feed";
import { getFollowers, getFollowings } from "../../lib/repositories/follow-relationship";
import { getTweets } from "../../lib/repositories/tweet";
import { getFavoriteTweets } from "./../../lib/repositories/like";

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
  // creator: async (parent, args, context) => {
  //   const creator = await getDoc(usersRef(context.db).doc(parent.creatorId));
  //   return creator;
  // },
  // favorite: async (parent, args, context) => {
  //   if (!context.uid) return false;
  //   const likeDoc = await getLike(context.db, { userId: context.uid, tweetId: parent.id });
  //   return !!likeDoc;
  // },
  // likedAt: async (parent, args, context) => {
  //   if (!context.uid) return null;
  //   const likeDoc = await getLike(context.db, { userId: context.uid, tweetId: parent.id });
  //   return likeDoc ? likeDoc.createdAt : null;
  // },
};
