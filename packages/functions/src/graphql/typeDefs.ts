import { gql } from "apollo-server-express";

export const typeDefs = gql`
scalar DateTime

type Mutation {
  updateProfile(id: ID!, input: UpdateProfileInput!): User!
}

type PageInfo {
  endCursor: String
  hasNext: Boolean!
}

type Query {
  feed(after: String, first: Int!): TweetConnection!
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

input UpdateProfileInput {
  displayName: String!
}

type User {
  displayName: String!
  id: String!
  tweets: [Tweet!]!
}
`;
