import { ApolloServer } from "apollo-server"
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import { GQLSchema as schema } from "../graphql/index"

const server = new ApolloServer({
  schema: schema,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
})
server
  .listen(4004)
  .then(({ url }) => {
    console.log(`Proof of Liabilities Server running at ${url}`)
  })
  .catch((err) => {
    console.log(err)
  })
