import { ApolloServer } from "apollo-server"
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import { GraphQLSchema } from "graphql"
import { Query } from "./src/graphql/query"
import dbconnnection from "./src/services/mongodb"

const schema = new GraphQLSchema({
  query: Query,
})

dbconnnection()
  .then(async (mongoose) => {
    await mongoose.connection.once("open", () => {
      console.log(`Connected to Mongo!`)
    })
  })
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
