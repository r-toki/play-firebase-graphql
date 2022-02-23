import { gql } from "apollo-server-express";

export const typeDefs = gql`
input CreateTweetInput {
  content: String!
}

scalar DateTime

input FollowInput {
  followedId: String!
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
  node: Tweet!
}

input UnFollowInput {
  followedId: String!
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
