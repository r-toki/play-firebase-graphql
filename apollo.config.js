const path = require("path");

module.exports = {
  client: {
    service: {
      name: "local",
      localSchemaFile: path.resolve(__dirname, "schema.graphql"),
    },
    includes: ["packages/client/src/**/*.{gql,ts,tsx}"],
    excludes: ["packages/client/src/graphql/generated.ts", "**/node_modules/**"],
  },
};
