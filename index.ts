import { ApolloServer } from "apollo-server"
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import { GraphQLSchema } from "graphql"
import { Query } from "./src/graphql/query"
import pool from "./src/services/postgresql"

const schema = new GraphQLSchema({
  query: Query,
})

pool
  .connect()
  .then(() => {
    const server = new ApolloServer({
      schema: schema,
      plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
    })
    server
      .listen(4004)
      .then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`)
      })
      .catch((err) => {
        console.log(err)
      })
  })
  .catch((err) => {
    console.log(err)
  })
