import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";

import { auth, db, verifyIdToken } from "./firebaseApp";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./resolvers";

const apiApp = express();

apiApp.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const idToken = req.header("authorization")?.split("Bearer ")[1];
    if (idToken) {
      const decodedIdToken = await verifyIdToken(idToken);
      return { decodedIdToken, auth, db };
    }
    return { decodedIdToken: undefined, auth, db };
  },
});

server.start().then(() => {
  server.applyMiddleware({ app: apiApp });
});

export { apiApp };
