const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  target: "node",
  mode: "production",
  entry: path.resolve(__dirname, "packages/functions/lib/tsc/index.js"),
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "packages/functions/lib/webpack"),
    libraryTarget: "commonjs",
  },
  externals: [nodeExternals({ allowlist: "common" })],
};
