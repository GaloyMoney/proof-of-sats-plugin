import { ApolloServer } from "apollo-server"
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import { GQLSchema as schema } from "../graphql/index"
import { pool } from "../services/postgresql"

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
