import { createPath } from "./hepler";

const users = "users";
const userTweets = "users/:userId/tweets";
const followings = "followings";

export const usersPath = createPath(users);
export const userTweetsPath = createPath(userTweets);
export const followingPath = createPath(followings);
