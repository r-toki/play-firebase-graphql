import { gql } from "apollo-server-express";

export const typeDefs = gql`
type Query {
  users: [User!]!
}

type User {
  displayName: String!
  id: String!
}
`;
