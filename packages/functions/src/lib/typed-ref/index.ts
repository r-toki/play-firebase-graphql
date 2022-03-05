import { pathBuilder } from "@rei-sogawa/path-builder";
import { Firestore } from "firebase-admin/firestore";
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

import { createConverter, createTypedCollectionRef } from "./helper";

export const usersRef = createTypedCollectionRef(
  pathBuilder<UsersPath>("users"),
  createConverter<UserData>()
);

export const userTweetsRef = createTypedCollectionRef(
  pathBuilder<UserTweetsPath>("users/:userId/tweets"),
  createConverter<UserTweetData>()
);

export const tweetsRef = (db: Firestore) =>
  db.collectionGroup("tweets").withConverter(createConverter<UserTweetData>());

export const userFollowsRef = createTypedCollectionRef(
  pathBuilder<UserFollowsPath>("users/:userId/follows"),
  createConverter<UserFollowData>()
);

export const followsRef = (db: Firestore) =>
  db.collectionGroup("follows").withConverter(createConverter<UserFollowData>());

export const userLikesRef = createTypedCollectionRef(
  pathBuilder<UserLikesPath>("users/:userId/likes"),
  createConverter<UserLikeData>()
);

export const likesRef = (db: Firestore) =>
  db.collectionGroup("likes").withConverter(createConverter<UserLikeData>());

export const tweetEventsRef = createTypedCollectionRef(
  pathBuilder<TweetEventsPath>("tweetEvents"),
  createConverter<TweetEventData>()
);
