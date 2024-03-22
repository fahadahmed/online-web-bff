import { FastifyContext } from 'apollo-server-fastify';
import { extractHeaderValue } from 'utils/requestUtils';
import { ContextType } from 'types';

const context = ({
  request,
  reply,
}: FastifyContext): Omit<ContextType, 'dataSources'> => {
  return {
    req: request?.raw,
    res: reply?.raw,
    forwardedHeaders: {
      authorization: extractHeaderValue(request?.headers, 'authorization'),
      'x-global-transaction-id': extractHeaderValue(
        request?.headers,
        'x-global-transaction-id',
      ),
      'x-dasl-transaction-id': extractHeaderValue(
        request?.headers,
        'x-global-transaction-id',
      ),
      'x-dasl-session-id': extractHeaderValue(
        request?.headers,
        'x-dasl-session-id',
      ),
      'x-forwarded-for': extractHeaderValue(
        request?.headers,
        'x-forwarded-for',
      ),
    },
    loggerContext: {
      transactionID: extractHeaderValue(
        request?.headers,
        'x-global-transaction-id',
      ),
      sourceIP: extractHeaderValue(request?.headers, 'x-forwarded-for'),
      sessionID: extractHeaderValue(request?.headers, 'x-dasl-session-id'),
    },
  };
};

export default context;
