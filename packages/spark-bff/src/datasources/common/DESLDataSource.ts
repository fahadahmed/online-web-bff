import type { Request, Response } from 'apollo-datasource-rest';
import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import invariant from 'invariant';
import { ApplicationLogEvent } from 'logging';
import { LoggerContext } from '../../types';
import { logger } from '../../apolloLogger';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_GW_BASE_URL?: string;
    }
  }
}

function sanitisePath(path: string) {
  return path.trim().replace(/(^\/|\/$)/g, '');
}

export interface DESLDataSourceContext {
  forwardedHeaders?: { [key: string]: string };
  loggerContext?: LoggerContext;
}

abstract class DESLDataSource extends RESTDataSource<DESLDataSourceContext> {
  constructor(basePath: string) {
    super();
    invariant(
      process.env.API_GW_BASE_URL,
      'API_GW_BASE_URL environment variable must be set',
    );

    this.baseURL = `${sanitisePath(process.env.API_GW_BASE_URL)}/${sanitisePath(
      basePath,
    )}`;
  }

  willSendRequest(request: RequestOptions) {
    const { forwardedHeaders, loggerContext } = this.context;

    if (forwardedHeaders) {
      Object.keys(forwardedHeaders).forEach((key) =>
        request.headers.set(key, forwardedHeaders[key]),
      );
    }

    /**
     * Use this to debug if there are issues with headers being forwarded.
     * Otherwise dont log it as it contains authorization tokens
     */
    // const headersToLog = [];
    // for (const header of request.headers) {
    //   headersToLog.push(header);
    // }
    // valid headers: ${JSON.stringify(headersToLog)}

    logger.info(
      new ApplicationLogEvent({
        message: `
          DESL Request
          url: ${this.baseURL}
          path: ${request.path}
          method: ${request.method}
          params: ${request.params}
          body: ${JSON.stringify(request.body) || ''}
        `,
        context: loggerContext,
      }),
    );
  }

  async didReceiveResponse(response: Response, request: Request) {
    const body = await super.didReceiveResponse(response, request);

    const { loggerContext } = this.context;

    logger.info(
      new ApplicationLogEvent({
        message: `
          DESL Response
          request url: ${request.url}
        `,
        context: loggerContext,
      }),
    );

    return body;
  }

  didEncounterError(error: Error, request: Request) {
    const { loggerContext } = this.context;

    logger.error(
      new ApplicationLogEvent({
        message: `
          DESL Error
          request url: ${request.url}
          error: ${error.message}
        `,
        context: loggerContext,
      }),
    );

    throw error;
  }
}

export default DESLDataSource;
