import { Timestamp } from "@/_universal";
import { WithIdAndRef } from "./types";

// Data

export type UserData = {
  displayName: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type UserTweetData = {
  content: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  creatorId: UserDoc["id"];
};

export type FollowingData = {
  followerId: UserDoc["id"];
  followeeId: UserDoc["id"];
};

// Doc

export type UserDoc = WithIdAndRef<UserData>;

export type UserTweetDoc = WithIdAndRef<UserTweetData>;

export type FollowingDoc = WithIdAndRef<FollowingData>;
