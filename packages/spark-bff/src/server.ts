import { ApolloServer } from 'apollo-server-fastify';
import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
import { logger } from 'apolloLogger';
import context from 'context';
import dataSources from 'datasources';
import { ApolloLoggerPlugin, ApplicationLogEvent } from 'logging';
import schema from 'schema';
import { formatResponse } from 'utils/formatResponse';
import { isDevelopmentEnvironment } from 'utils/isDevelopmentEnvironment';

process.on('uncaughtException', (err) => {
  logger.error(new ApplicationLogEvent({ message: err.message, context: {} }));
  throw err;
});

const apolloServer = new ApolloServer({
  schema,
  dataSources,
  formatResponse,
  logger,
  context,
  introspection: isDevelopmentEnvironment(),
  plugins: [
    new ApolloLoggerPlugin(
      `BFF Server Started. BUILD_ID: ${process.env.BUILD_BUILDID}`,
    ),
    isDevelopmentEnvironment()
      ? ApolloServerPluginLandingPageGraphQLPlayground()
      : ApolloServerPluginLandingPageDisabled(),
  ],
});

export default apolloServer;
