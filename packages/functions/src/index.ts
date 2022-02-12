import { ApolloServer, gql } from "apollo-server-cloud-functions";
// import cors from "cors";
import * as functions from "firebase-functions";

const TOKYO = "asia-northeast1";

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
const handler = server.createHandler() as any;

exports.api = functions.region(TOKYO).https.onRequest(handler);
