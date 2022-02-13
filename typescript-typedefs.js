const { printSchema } = require("graphql");

module.exports = {
  plugin: (schema, documents, config) => {
    return [
      'import { gql } from "apollo-server-express";',
      "",
      "export const typeDefs = gql`",
      printSchema(schema),
      "`;",
      "",
    ].join("\n");
  },
};
