import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import { auth, firestore } from "firebase-admin";

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
      const decodedIdToken = await auth().verifyIdToken(idToken);
      return { decodedIdToken, db: firestore() };
    }
    return { decodedIdToken: undefined, db: firestore() };
  },
});

server.start().then(() => {
  server.applyMiddleware({ app: apiApp });
});

export { apiApp };
