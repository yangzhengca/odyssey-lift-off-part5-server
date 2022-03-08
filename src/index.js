const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const TrackAPI = require('./datasources/track-api');
// const { ApolloServerPluginSchemaReporting } = require("apollo-server-core");

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
      return {
        trackAPI: new TrackAPI(),
      };
    },
    // apollo: {
    //   // You can also just set $APOLLO_GRAPH_VARIANT.
    //   graphVariant: 'current',
    // },
    // plugins: [
    //   ApolloServerPluginSchemaReporting({
    //     endpointUrl: "https://schema-reporting.api.staging.c0.gql.zone/api/graphql"
    //   }),
    // ],
  });
// await server.listen({port: process.env.PORT || 4000});
  const { url, port } = await server.listen({port: process.env.PORT || 4000});
  console.log(`
      🚀  Server is running
      🔉  Listening on port ${port}
      📭  Query at ${url}
    `);
}

startApolloServer(typeDefs, resolvers);
