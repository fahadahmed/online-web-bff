import { performance } from 'perf_hooks';
import {
  ApolloServerPlugin,
  GraphQLRequestContext,
  GraphQLRequestListener,
  GraphQLServiceContext,
} from 'apollo-server-plugin-base';
import { GraphQLResponse } from 'apollo-server-types';
import { ContextType } from '../types';
import AccessLogEvent from './LogEvent/AccessLogEvent';
import ApplicationLogEvent from './LogEvent/ApplicationLogEvent';

function getStatusCode(errors?: GraphQLResponse['errors']): string {
  if (!errors?.length) return 'OK';

  return errors[0].extensions?.code || 'INTERNAL_SERVER_ERROR';
}

export default class ApolloLoggerPlugin
  implements ApolloServerPlugin<ContextType>
{
  constructor(private readonly startMessage: string) {}

  async serverWillStart({ logger }: GraphQLServiceContext) {
    if (logger) {
      logger.info(
        new ApplicationLogEvent({ message: this.startMessage, context: {} }),
      );
    }
  }

  async requestDidStart(
    requestContext: GraphQLRequestContext<ContextType>,
  ): Promise<GraphQLRequestListener<ContextType>> {
    const startTime = performance.now();
    const {
      logger,
      context: { loggerContext },
      request,
    } = requestContext;

    if (!logger || request.operationName === 'IntrospectionQuery') {
      return {};
    }

    logger.info(
      new AccessLogEvent({
        message: `
          BFF Request
          query: ${JSON.stringify(request.query)}
          variables: ${JSON.stringify(request.variables)}
        `,
        context: loggerContext,
      }),
    );

    return {
      didEncounterErrors: async ({ errors, context }) => {
        logger.error(
          new AccessLogEvent({
            message: `
              BFF Error
              errors: ${errors.map((e) => e.message).join(' | ')}
            `,
            context: context.loggerContext,
          }),
        );
      },
      willSendResponse: async ({ response }) => {
        logger.info(
          new AccessLogEvent({
            message: `
              BFF Response
              data: TEMPORARILY REMOVED
              errors: ${JSON.stringify(response.errors)}
            `,
            context: {
              ...loggerContext,
              statusCode: getStatusCode(response.errors),
              duration: performance.now() - startTime,
            },
          }),
        );
      },
    };
  }
}
