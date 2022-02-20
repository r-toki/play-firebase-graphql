import { pathBuilder } from "@rei-sogawa/path-builder";
import type {
  FollowingData,
  FollowingsPath,
  UserData,
  UsersPath,
  UserTweetData,
  UserTweetsPath,
} from "interfaces/admin";
import { Firestore } from "firebase-admin/firestore";

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

export const followingRef = createTypedCollectionRef(
  pathBuilder<FollowingsPath>("followings"),
  createConverter<FollowingData>()
);
