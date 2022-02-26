import { Resolvers } from "../../graphql/generated";
import { isSignedIn } from "../../lib/authorization";
import { getDoc, getDocs } from "../../lib/query-util/get";
import { getFeed } from "../../lib/repositories/feed";
import { getTweet } from "../../lib/repositories/tweet";
import { usersRef } from "../../lib/typed-ref";
import { getFavoriteTweets } from "./../../lib/repositories/like";
import { getTweetEdge } from "./../../lib/repositories/tweet";

export const Query: Resolvers["Query"] = {
  me: async (parent, args, context) => {
    isSignedIn(context);

    const meDoc = await getDoc(usersRef(context.db).doc(context.uid));
    return meDoc;
  },

  user: async (parent, args, context) => {
    isSignedIn(context);

    const userDoc = await getDoc(usersRef(context.db).doc(args.id));
    return userDoc;
  },

  users: async (parent, args, context) => {
    isSignedIn(context);

    const userDocs = await getDocs(usersRef(context.db).orderBy("createdAt", "desc"));
    return userDocs;
  },

  tweet: async (parent, args, context) => {
    isSignedIn(context);

    const tweetDoc = await getTweet(context.db, { id: args.id });
    return tweetDoc;
  },

  feed: async (parent, args, context) => {
    isSignedIn(context);

    const tweetConnection = await getFeed(context.db, {
      userId: context.uid,
      first: args.first,
      after: args.after,
    });
    return tweetConnection;
  },

  tweetEdge: async (parent, args, context) => {
    isSignedIn(context);

    const tweetEdge = await getTweetEdge(context.db, { id: args.id });
    return tweetEdge;
  },

  favoriteTweets: async (parent, args, context) => {
    isSignedIn(context);

    const tweetConnection = await getFavoriteTweets(context.db, {
      userId: context.uid,
      first: args.first,
      after: args.after,
    });
    return tweetConnection;
  },
};
