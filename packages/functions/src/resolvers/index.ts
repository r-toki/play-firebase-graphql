import { Firestore, Timestamp } from "firebase-admin/firestore";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { GraphQLScalarType, Kind, ValueNode } from "graphql";

import { Resolvers } from "../graphql/generated";
import { getDoc, getDocs } from "../lib/firestore-helper";
import { tweetsRef, usersRef, userTweetsRef } from "./../lib/typed-ref/index";

type Context = { decodedIdToken: DecodedIdToken | undefined; db: Firestore };

export const resolvers: Resolvers<Context> = {
  Query: {
    users: (parent, args, { db }) => getDocs(usersRef(db).orderBy("createdAt", "desc")),
    tweets: (parent, args, { db }) => getDocs(tweetsRef(db).orderBy("createdAt", "desc")),
  },
  User: {
    tweets: (parent, args, { db }) =>
      getDocs(userTweetsRef(db, { userId: parent.id }).orderBy("createdAt", "desc")),
  },
  Tweet: {
    creator: (parent, args, { db }) => getDoc(usersRef(db).doc(parent.creatorId)),
  },
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "A valid date time value.",
    parseValue(value) {
      if (typeof value !== "string") throw new Error("DateTime parseValue failed");
      return new Date(value);
    },
    serialize(value) {
      if (!(value instanceof Timestamp)) throw new Error("DateTime serialize failed");
      return value.toDate().toISOString();
    },
    parseLiteral(ast: ValueNode) {
      switch (ast.kind) {
        case Kind.STRING:
          return new Date(ast.value);
        default:
          return null;
      }
    },
  }),
};
