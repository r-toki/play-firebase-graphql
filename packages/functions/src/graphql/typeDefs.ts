import { gql } from "apollo-server-express";

export const typeDefs = gql`
scalar DateTime

type Mutation {
  updateProfile(id: ID!, input: UpdateProfileInput!): User!
}

type Query {
  feed: [Tweet!]!
  tweets: [Tweet!]!
  user(id: ID!): User!
  users: [User!]!
}

type Tweet {
  content: String!
  createdAt: DateTime!
  creator: User!
  id: String!
}

input UpdateProfileInput {
  displayName: String!
  updatedAt: DateTime
}

type User {
  displayName: String!
  id: String!
  tweets: [Tweet!]!
}
`;
