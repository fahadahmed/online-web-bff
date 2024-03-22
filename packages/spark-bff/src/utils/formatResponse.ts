import { GraphQLRequestContext, GraphQLResponse } from 'apollo-server-types';
import { logger } from 'apolloLogger';
import { GraphQLFormattedError } from 'graphql';
import { ApplicationLogEvent } from 'logging';
import { isDevelopmentEnvironment } from 'utils/isDevelopmentEnvironment';
import { LoggerContext } from '../types';

interface LogErrorParameter {
  context: LoggerContext;
  error: GraphQLFormattedError;
}

function logError({ context, error }: LogErrorParameter) {
  const errorResponse = error.extensions.response as { body?: string };

  logger.error(
    new ApplicationLogEvent({
      message: `
        BFF Error
        message: ${error.message}
        path: ${error.path}
        locations: ${error.locations}
        ${
          errorResponse?.body
            ? `DESL body: ${JSON.stringify(errorResponse.body)}`
            : ''
        }
      `,
      context,
    }),
  );
}

function formatErrorResponse(
  originalResponse: GraphQLResponse,
  requestContext: GraphQLRequestContext<LoggerContext>,
): GraphQLResponse {
  logError({
    context: requestContext.context,
    error: originalResponse.errors[0],
  });
  if (isDevelopmentEnvironment()) {
    return originalResponse;
  }

  const productionErrors = originalResponse.errors.map((orginalError) => {
    return {
      ...orginalError,
      path: [],
      locations: [],
      extensions: { response: orginalError.extensions?.response },
    };
  });
  return { errors: productionErrors };
}

export function formatResponse(
  originalResponse: GraphQLResponse,
  requestContext: GraphQLRequestContext<LoggerContext>,
): GraphQLResponse {
  const hasError = Boolean(originalResponse.errors?.length);

  if (hasError) {
    return formatErrorResponse(originalResponse, requestContext);
  }

  return originalResponse;
}
