import database from "./database"

export const GALOY_GRAPHQL_ENDPOINT =
  process.env.GALOY_GRAPHQL_ENDPOINT || "http://localhost:4001/graphql"
export const databaseClientConfig = database
