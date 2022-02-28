import { gql } from "apollo-server-express";

export const typeDefs = gql`
input CreateTweetInput {
  content: String!
}

scalar DateTime

type Mutation {
  createTweet(input: CreateTweetInput!): Tweet!
  deleteTweet(id: ID!): User!
  follow(userId: ID!): User!
  like(tweetId: ID!): Tweet!
  unFollow(userId: ID!): User!
  unLike(tweetId: ID!): Tweet!
  updateProfile(input: UpdateProfileInput!): User!
  updateTweet(id: ID!, input: UpdateTweetInput!): Tweet!
}

type PageInfo {
  endCursor: String
  hasNext: Boolean!
}

type Query {
  me: User!
  tweetEdge(id: ID!): TweetEdge!
  user(id: ID!): User!
  users: [User!]!
}

enum TWEET_FILTER {
  FOLLOWINGS
  LIKES
  SELF
}

type Tweet {
  content: String!
  createdAt: DateTime!
  id: String!
  liked: Boolean!
  likedBy: [User!]!
  postedBy: User!
}

type TweetConnection {
  edges: [TweetEdge!]!
  pageInfo: PageInfo!
}

type TweetEdge {
  cursor: String!
  node: Tweet!
}

input TweetsInput {
  after: String
  filters: [TWEET_FILTER!]!
  first: Int!
}

input UpdateProfileInput {
  displayName: String!
}

input UpdateTweetInput {
  content: String!
}

type User {
  displayName: String!
  followers: [User!]!
  followings: [User!]!
  id: String!
  tweets(input: TweetsInput!): TweetConnection!
}
`;
