import { ApolloServer, gql } from "apollo-server-express";
import cors from "cors";
import express from "express";
import * as functions from "firebase-functions";

const TOKYO = "asia-northeast1";

const apiApp = express();

apiApp.use(cors());

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

server.start().then(() => {
  server.applyMiddleware({ app: apiApp });
});

exports.api = functions.region(TOKYO).https.onRequest(apiApp);
