import { _UserData, _FollowingData, _UserTweetData } from "./schema";
import { Timestamp } from "firebase-admin/firestore";

export type UserData = _UserData<Timestamp>;
export type UserTweetData = _UserTweetData<Timestamp>;
export type FollowingData = _FollowingData<Timestamp>;
