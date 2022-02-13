import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";

import { resolvers } from "./resolvers";

export const getApiApp = async () => {
  const apiApp = express();
  apiApp.use(cors());
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app: apiApp });
  return apiApp;
};
