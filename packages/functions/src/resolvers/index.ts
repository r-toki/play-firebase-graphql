import { Resolvers } from "../graphql/generated";
import * as CustomScalars from "./custom-scalars";
import { Mutation } from "./mutation";
import { Query } from "./query";
import * as RootTypes from "./root-types";

export const resolvers: Resolvers = {
  Query,
  Mutation,
  ...RootTypes,
  ...CustomScalars,
};
