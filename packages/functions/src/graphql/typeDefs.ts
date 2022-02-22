import { gql } from "apollo-server-express";

export const typeDefs = gql`
scalar DateTime

type Mutation {
  updateProfile(id: ID!, input: UpdateProfileInput!): User!
}

type Query {
  feed(cursor: DateTime, limit: Int!): [Tweet!]!
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
}

type User {
  displayName: String!
  id: String!
  tweets: [Tweet!]!
}
`;
