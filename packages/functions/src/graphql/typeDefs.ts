import { gql } from "apollo-server-express";

export const typeDefs = gql`
scalar DateTime

type Query {
  tweets: [Tweet!]!
  users: [User!]!
}

type Tweet {
  content: String!
  createdAt: DateTime!
  creator: User!
  id: String!
}

type User {
  displayName: String!
  id: String!
  tweets: [Tweet!]!
}
`;
