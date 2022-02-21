type UserId = string;
export type _UserData<Timestamp> = {
  displayName: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

type UserTweetId = string;
export type _UserTweetData<Timestamp> = {
  content: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  creatorId: UserId;
};

type FollowingId = string;
export type _FollowingData<Timestamp> = {
  followerId: UserId;
  followeeId: UserId;
  createdAt: Timestamp;
};
