import { _UserData, _FollowingData, _UserTweetData } from "./schema";
import { Timestamp, DocumentReference } from "firebase/firestore";

type WithIdAndRef<T> = { id: string; ref: DocumentReference<T> } & T;

export type UserData = _UserData<Timestamp>;
export type UserTweetData = _UserTweetData<Timestamp>;
export type FollowingData = _FollowingData<Timestamp>;

export type UserDoc = WithIdAndRef<UserData>;
export type UserTweetDoc = WithIdAndRef<UserTweetData>;
export type FollowingDoc = WithIdAndRef<FollowingData>;
