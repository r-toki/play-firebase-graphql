import { ApolloServer, gql } from "apollo-server-cloud-functions";
import * as functions from "firebase-functions";

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

exports.api = functions.https.onRequest(server.createHandler() as any);
