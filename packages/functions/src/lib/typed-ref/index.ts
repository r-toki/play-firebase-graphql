import {
  type FollowingData,
  type UserData,
  type UserTweetData,
  followingPath,
  usersPath,
  userTweetsPath,
} from "common/admin";
import { firestore } from "firebase-admin";

import { createConverter, createTypedCollectionRef } from "./helper";

const db = firestore();

export const usersRef = createTypedCollectionRef(db, usersPath, createConverter<UserData>());

export const userTweetsRef = createTypedCollectionRef(
  db,
  userTweetsPath,
  createConverter<UserTweetData>()
);

export const followingRef = createTypedCollectionRef(
  db,
  followingPath,
  createConverter<FollowingData>()
);
