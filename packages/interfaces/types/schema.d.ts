type UserId = string;
export type _UserData<Timestamp> = {
  displayName: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

type UserTweetId = string;
export type _UserTweetData<Timestamp> = {
  id: UserTweetId;

  content: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;

  userId: UserId;
};

export type _UserFollowData<Timestamp> = {
  createdAt: Timestamp;

  followerId: UserId;
  followedId: UserId;
};

export type _UserLikeDate<Timestamp> = {
  createdAt: Timestamp;

  userId: UserId;
  tweetId: UserTweetId;
};

type TweetEventId = string;
export type _TweetEventData<Timestamp> = {
  type: "create" | "update" | "delete";
  createdAt: Timestamp;

  userId: UserId;
  tweetId: UserTweetId;
};
