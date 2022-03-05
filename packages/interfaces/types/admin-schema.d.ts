import type { Timestamp, DocumentReference } from "firebase-admin/firestore";

import type {
  _TweetEventData,
  _UserData,
  _UserFollowData,
  _UserLikeDate,
  _UserTweetData,
} from "./schema.d";

type WithIdAndRef<T> = { id: string; ref: DocumentReference<T> } & T;

// Data
export type UserData = _UserData<Timestamp>;
export type UserTweetData = _UserTweetData<Timestamp>;
export type UserFollowData = _UserFollowData<Timestamp>;
export type UserLikeData = _UserLikeDate<Timestamp>;

export type TweetEventData = _TweetEventData<Timestamp>;

// Doc
export type UserDoc = WithIdAndRef<UserData>;
export type UserTweetDoc = WithIdAndRef<UserTweetData>;
export type UserFollowDoc = WithIdAndRef<UserFollowData>;
export type UserLikeDoc = WithIdAndRef<UserLikeData>;

export type TweetEventDoc = WithIdAndRef<TweetEventData>;
