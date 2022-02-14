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
};

export type FollowingData = {
  followerId: Pick<User, "id">;
  followeeId: Pick<User, "id">;
};

// Entity

export type User = WithIdAndRef<UserData>;

export type UserTweet = WithIdAndRef<UserTweetData>;

export type Following = WithIdAndRef<FollowingData>;
