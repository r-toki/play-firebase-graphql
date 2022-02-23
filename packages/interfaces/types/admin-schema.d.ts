import { _TweetEventData } from "./schema.d";
import { _UserData, _UserTweetData, _FollowRelationshipData } from "./schema";
import { Timestamp, DocumentReference } from "firebase-admin/firestore";

type WithIdAndRef<T> = { id: string; ref: DocumentReference<T> } & T;

export type UserData = _UserData<Timestamp>;
export type UserTweetData = _UserTweetData<Timestamp>;
export type FollowRelationshipData = _FollowRelationshipData<Timestamp>;
export type TweetEventData = _TweetEventData<Timestamp>;

export type UserDoc = WithIdAndRef<UserData>;
export type UserTweetDoc = WithIdAndRef<UserTweetData>;
export type FollowRelationshipDoc = WithIdAndRef<FollowRelationshipData>;
export type TweetEventDoc = WithIdAndRef<TweetEventData>;
