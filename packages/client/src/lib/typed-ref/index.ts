import { pathBuilder } from "@rei-sogawa/path-builder";
import type {
  FollowingData,
  FollowingsPath,
  UserData,
  UsersPath,
  UserTweetData,
  UserTweetsPath,
} from "common/web";

import { db } from "../../firebaseApp";
import { createConverter, createTypedCollectionRef } from "./helper";

export const usersRef = createTypedCollectionRef(
  db,
  pathBuilder<UsersPath>("users"),
  createConverter<UserData>()
);

export const userTweetsRef = createTypedCollectionRef(
  db,
  pathBuilder<UserTweetsPath>("users/:userId/tweets"),
  createConverter<UserTweetData>()
);

export const followingRef = createTypedCollectionRef(
  db,
  pathBuilder<FollowingsPath>("followings"),
  createConverter<FollowingData>()
);
