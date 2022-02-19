import { gql } from "apollo-server-express";

export const typeDefs = gql`
type Query {
  users: [User!]!
}

type Tweet {
  content: String!
  creator: User!
  id: String!
}

type User {
  displayName: String!
  id: String!
  tweets: [Tweet!]!
}
`;
