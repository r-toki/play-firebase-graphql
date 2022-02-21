import { pathBuilder } from "@rei-sogawa/path-builder";
import type { FollowingsPath, UsersPath, UserTweetsPath } from "interfaces/path";
import type { FollowingData, UserData, UserTweetData } from "interfaces/web-schema";

import { createConverter, createTypedCollectionRef } from "./helper";

export const usersRef = createTypedCollectionRef(
  pathBuilder<UsersPath>("users"),
  createConverter<UserData>()
);

export const userTweetsRef = createTypedCollectionRef(
  pathBuilder<UserTweetsPath>("users/:userId/tweets"),
  createConverter<UserTweetData>()
);

export const followingRef = createTypedCollectionRef(
  pathBuilder<FollowingsPath>("followings"),
  createConverter<FollowingData>()
);
