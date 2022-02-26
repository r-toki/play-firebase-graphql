import { Resolvers } from "../../graphql/generated";
import { getDoc, getDocs } from "../../lib/query/util/get";
import { usersRef, userTweetsRef } from "../../lib/typed-ref";
import { followRelationshipsRef } from "./../../lib/typed-ref/index";

export const User: Resolvers["User"] = {
  tweets: async (parent, args, context) => {
    const tweetDocs = await getDocs(
      userTweetsRef(context.db, { userId: parent.id }).orderBy("createdAt", "desc")
    );

    return tweetDocs;
  },

  followings: async (parent, args, context) => {
    const relationshipDocs = await getDocs(
      followRelationshipsRef(context.db)
        .where("followerId", "==", parent.id)
        .orderBy("createdAt", "desc")
    );
    const followingsIds = relationshipDocs.map((v) => v.followedId);
    const followingDocs = Promise.all(
      followingsIds.map((id) => getDoc(usersRef(context.db).doc(id)))
    );

    return followingDocs;
  },

  followers: async (parent, args, context) => {
    const relationshipDocs = await getDocs(
      followRelationshipsRef(context.db)
        .where("followedId", "==", parent.id)
        .orderBy("createdAt", "desc")
    );
    const followerIds = relationshipDocs.map((v) => v.followedId);
    const followerDocs = Promise.all(followerIds.map((id) => getDoc(usersRef(context.db).doc(id))));

    return followerDocs;
  },
};

export const Tweet: Resolvers["Tweet"] = {
  creator: async (parent, args, context) => {
    const creator = await getDoc(usersRef(context.db).doc(parent.creatorId));

    return creator;
  },
};
