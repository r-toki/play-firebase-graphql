import { v4 } from "uuid";

import { Resolvers } from "../../graphql/generated";
import { isSignedIn } from "../../lib/authorization";
import { getDoc } from "../../lib/query-util/get";
import { createTweet } from "../../lib/repositories/tweet";
import { usersRef } from "../../lib/typed-ref";
import { follow, unFollow } from "./../../lib/repositories/follow-relationship";
import { updateUser } from "./../../lib/repositories/user";
import { userTweetsRef } from "./../../lib/typed-ref/index";

export const Mutation: Resolvers["Mutation"] = {
  updateProfile: async (parent, args, context) => {
    isSignedIn(context);

    await updateUser(context.db, {
      userId: context.uid,
      displayName: args.input.displayName,
    });
    const meDoc = await getDoc(usersRef(context.db).doc(context.uid));
    return meDoc;
  },

  createTweet: async (parent, args, context) => {
    isSignedIn(context);

    const tweetId = v4();
    await createTweet(context.db, {
      tweetId,
      creatorId: context.uid,
      content: args.input.content,
    });
    const tweetDoc = await getDoc(userTweetsRef(context.db, { userId: context.uid }).doc(tweetId));
    return tweetDoc;
  },

  follow: async (parent, args, context) => {
    isSignedIn(context);

    await follow(context.db, {
      followerId: context.uid,
      followedId: args.input.followedId,
    });
    const meDoc = await getDoc(usersRef(context.db).doc(context.uid));
    return meDoc;
  },

  unFollow: async (parent, args, context) => {
    isSignedIn(context);

    await unFollow(context.db, {
      followerId: context.uid,
      followedId: args.input.followedId,
    });
    const meDoc = await getDoc(usersRef(context.db).doc(context.uid));
    return meDoc;
  },
};
