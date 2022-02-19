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
  creatorId: Pick<UserDoc, "id">;
};

export type FollowingData = {
  followerId: Pick<UserDoc, "id">;
  followeeId: Pick<UserDoc, "id">;
};

// Entity

export type UserDoc = WithIdAndRef<UserData>;

export type UserTweetDoc = WithIdAndRef<UserTweetData>;

export type FollowingDoc = WithIdAndRef<FollowingData>;
