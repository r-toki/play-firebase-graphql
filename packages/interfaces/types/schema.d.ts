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
  tweetId: UserTweetId;
  creatorId: UserId;
};

type FollowRelationshipId = string;
export type _FollowRelationshipData<Timestamp> = {
  followerId: UserId;
  followedId: UserId;
  createdAt: Timestamp;
};

type TweetEventId = string;
export type _TweetEventData<Timestamp> = {
  type: "create" | "update" | "delete";
  userId: UserId;
  tweetId: UserTweetId;
  createdAt: Timestamp;
};
