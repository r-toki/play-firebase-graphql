import type { Timestamp, DocumentReference } from "firebase-admin/firestore";

import type {
  _LikeData,
  _TweetEventData,
  _UserData,
  _UserTweetData,
  _FollowRelationshipData,
} from "./schema.d";

type WithIdAndRef<T> = { id: string; ref: DocumentReference<T> } & T;

export type UserData = _UserData<Timestamp>;
export type UserTweetData = _UserTweetData<Timestamp>;
export type FollowRelationshipData = _FollowRelationshipData<Timestamp>;
export type TweetEventData = _TweetEventData<Timestamp>;
export type LikeData = _LikeData<Timestamp>;

export type UserDoc = WithIdAndRef<UserData>;
export type UserTweetDoc = WithIdAndRef<UserTweetData>;
export type FollowRelationshipDoc = WithIdAndRef<FollowRelationshipData>;
export type TweetEventDoc = WithIdAndRef<TweetEventData>;
export type LikeDoc = WithIdAndRef<LikeData>;
