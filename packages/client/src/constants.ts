const isProduction = import.meta.env.MODE === "production";

export const GRAPHQL_ENDPOINT = isProduction
  ? "https://us-central1-playground-67a20.cloudfunctions.net/api/graphql"
  : "http://localhost:5001/playground-67a20/asia-northeast1/api/graphql";
