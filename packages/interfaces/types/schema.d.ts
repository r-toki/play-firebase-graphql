type UserId = string;
export type _UserData<Timestamp> = {
  displayName: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

type UserTweetId = string;
export type _UserTweetData<Timestamp> = {
  id: UserTweetId;
  userId: UserId;
  content: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type _UserFollowData<Timestamp> = {
  followerId: UserId;
  followedId: UserId;
  createdAt: Timestamp;
};

export type _UserLikeDate<Timestamp> = {
  userId: UserId;
  tweetId: UserTweetId;
  createdAt: Timestamp;
};

type TweetEventId = string;
export type _TweetEventData<Timestamp> = {
  userId: UserId;
  tweetId: UserTweetId;
  type: "create" | "update" | "delete";
  createdAt: Timestamp;
};
