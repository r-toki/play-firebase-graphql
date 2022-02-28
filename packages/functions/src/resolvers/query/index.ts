import { Resolvers } from "../../graphql/generated";
import { isSignedIn } from "../../lib/authorization";
import { getTweetEdge } from "../../lib/query/getTweetEdge";
import { getDoc, getDocs } from "../../lib/query-util/get";
import { usersRef } from "../../lib/typed-ref";

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

  tweetEdge: async (parent, args, context) => {
    isSignedIn(context);

    const tweetEdge = await getTweetEdge(context.db, { id: args.id });
    return tweetEdge;
  },
};
