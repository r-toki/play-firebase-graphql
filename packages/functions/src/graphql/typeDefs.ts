import { gql } from "apollo-server-express";

export const typeDefs = gql`
input CreateTweetInput {
  content: String!
}

scalar DateTime

input FollowInput {
  followedId: ID!
}

type Mutation {
  createTweet(input: CreateTweetInput!): Tweet!
  follow(input: FollowInput!): User!
  unFollow(input: UnFollowInput!): User!
  updateProfile(input: UpdateProfileInput!): User!
}

type PageInfo {
  endCursor: String
  hasNext: Boolean!
}

type Query {
  feed(after: String, first: Int!): TweetConnection!
  me: User!
  tweet(id: ID!): Tweet!
  tweetEdge(id: ID!): TweetEdge!
  user(id: ID!): User!
  users: [User!]!
}

type Tweet {
  content: String!
  createdAt: DateTime!
  creator: User!
  id: String!
}

type TweetConnection {
  edges: [TweetEdge!]!
  pageInfo: PageInfo!
}

type TweetEdge {
  cursor: String!
  node: Tweet!
}

input UnFollowInput {
  followedId: ID!
}

input UpdateProfileInput {
  displayName: String!
}

type User {
  displayName: String!
  followers: [User!]!
  followings: [User!]!
  id: String!
  tweets: [Tweet!]!
}
`;
