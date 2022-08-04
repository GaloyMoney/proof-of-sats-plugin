import { GraphQLSchema } from "graphql"
import { Query } from "./query"

export const GQLSchema = new GraphQLSchema({
  query: Query,
})
