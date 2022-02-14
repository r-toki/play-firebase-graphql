import { gql } from "apollo-server-express";

export const typeDefs = gql`
type Query {
  currentUser: User!
  hello: String!
  helloWithAuth: String!
}

type User {
  displayName: String!
}
`;
