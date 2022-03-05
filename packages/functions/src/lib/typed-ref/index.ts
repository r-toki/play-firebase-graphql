import type {
  TweetEventData,
  UserData,
  UserFollowData,
  UserLikeData,
  UserTweetData,
} from "interfaces/admin-schema";
import type {
  TweetEventsPath,
  UserFollowsPath,
  UserLikesPath,
  UsersPath,
  UserTweetsPath,
} from "interfaces/path";

import { typedCollectionGroupRef, typedCollectionRef } from "./helper";

export const usersRef = typedCollectionRef<UserData, UsersPath>("users");

export const userTweetsRef = typedCollectionRef<UserTweetData, UserTweetsPath>(
  "users/:userId/tweets"
);
export const tweetsRef = typedCollectionGroupRef<UserTweetData>("tweets");

export const userFollowsRef = typedCollectionRef<UserFollowData, UserFollowsPath>(
  "users/:userId/follows"
);
export const followsRef = typedCollectionGroupRef<UserFollowData>("follows");

export const userLikesRef = typedCollectionRef<UserLikeData, UserLikesPath>("users/:userId/likes");
export const likesRef = typedCollectionGroupRef<UserLikeData>("likes");

export const tweetEventsRef = typedCollectionRef<TweetEventData, TweetEventsPath>("tweetEvents");
