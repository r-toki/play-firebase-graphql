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

type Tweet {
  content: String!
  createdAt: DateTime!
  creator: User!
  favorite: Boolean!
  id: String!
  likedAt: DateTime
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
  favoriteTweets(input: TweetsInput!): TweetConnection!
  feed(input: TweetsInput!): TweetConnection!
  followers: [User!]!
  followings: [User!]!
  id: String!
  tweets(input: TweetsInput!): TweetConnection!
}
`;
