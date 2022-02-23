import { pathBuilder } from "@rei-sogawa/path-builder";
import { Firestore } from "firebase-admin/firestore";
import type {
  FollowRelationshipData,
  TweetEventData,
  UserData,
  UserTweetData,
} from "interfaces/admin-schema";
import type {
  FollowRelationshipsPath,
  TweetEventsPath,
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

export const followRelationshipsRef = createTypedCollectionRef(
  pathBuilder<FollowRelationshipsPath>("followRelationships"),
  createConverter<FollowRelationshipData>()
);

export const tweetEventsRef = createTypedCollectionRef(
  pathBuilder<TweetEventsPath>("tweetEvents"),
  createConverter<TweetEventData>()
);
