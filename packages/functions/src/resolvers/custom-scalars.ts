import { Timestamp } from "firebase-admin/firestore";
import { GraphQLScalarType, Kind, ValueNode } from "graphql";

export const DateTime = new GraphQLScalarType({
  name: "DateTime",
  description: "A valid date time value.",
  parseValue(value) {
    if (typeof value !== "string") throw new Error("DateTime parseValue failed");
    return new Date(value);
  },
  serialize(value) {
    if (value instanceof Date) return value.toISOString();
    if (value instanceof Timestamp) return value.toDate().toISOString();
    throw new Error("DateTime serialize failed");
  },
  parseLiteral(ast: ValueNode) {
    switch (ast.kind) {
      case Kind.STRING:
        return new Date(ast.value);
      default:
        return null;
    }
  },
});
