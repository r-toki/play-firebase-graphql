import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";

import { context } from "./context";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./resolvers";

export const createApiApp = () => {
  const apiApp = express();

  apiApp.use(cors());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
  });

  server.start().then(() => {
    server.applyMiddleware({ app: apiApp });
  });

  return apiApp;
};
