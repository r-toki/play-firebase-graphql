import { Resolvers } from "../graphql/generated";

export const resolvers: Resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
};
