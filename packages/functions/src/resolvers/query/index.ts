import { Resolvers } from "../../graphql/generated";
import { isSignedIn } from "../../lib/authorization";
import { getDoc, getDocs } from "../../lib/query-util/get";
import { getFeed } from "../../lib/repositories/feed";
import { getFavoriteTweets } from "../../lib/repositories/like";
import { usersRef } from "../../lib/typed-ref";
import { getTweetEdge } from "./../../lib/repositories/tweet";

export const Query: Resolvers["Query"] = {
  me: async (parent, args, context) => {
    isSignedIn(context);

    const meDoc = await getDoc(usersRef(context.db).doc(context.uid));
    return meDoc;
  },

  users: async (parent, args, context) => {
    isSignedIn(context);

    const userDocs = await getDocs(usersRef(context.db).orderBy("createdAt", "desc"));
    return userDocs;
  },

  tweetEdge: async (parent, args, context) => {
    isSignedIn(context);

    const tweetEdge = await getTweetEdge(context.db, { id: args.id });
    return tweetEdge;
  },

  feed: async (parent, args, context) => {
    const tweetConnection = await getFeed(context.db, {
      userId: args.input.userId,
      first: args.input.first,
      after: args.input.after,
    });
    return tweetConnection;
  },

  favoriteTweets: async (parent, args, context) => {
    const tweetConnection = await getFavoriteTweets(context.db, {
      userId: args.input.userId,
      first: args.input.first,
      after: args.input.after,
    });
    return tweetConnection;
  },
};
