import {
  GraphQLRequestContext,
  GraphQLServiceContext,
} from 'apollo-server-types';
import ApolloLogger from './ApolloLogger';
import ApolloLoggerPlugin from './ApolloLoggerPlugin';
import { ContextType } from '../types';

test('logger plugin writes log messages', async () => {
  process.env.SNZ_LOG_TESTING = '1';

  const consoleSpy = jest
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-underscore-dangle
    .spyOn((console as any)._stderr, 'write')
    .mockImplementation(() => {
      /* noop */
    });

  const context: Omit<ContextType, 'dataSources'> = {
    loggerContext: {
      sourceIP: 'sourceIP',
      userID: 'userID',
      clientName: 'clientName',
      sessionID: 'sessionID',
      transactionID: 'transactionID',
    },
  };
  const logger = new ApolloLogger();

  const plugin = new ApolloLoggerPlugin('test start message');
  await plugin.serverWillStart({ logger } as unknown as GraphQLServiceContext);
  expect(consoleSpy.mock.calls[0][0]).toContain(
    'INFO [-] [-] [-] [-] [-] test start message',
  );

  consoleSpy.mockReset();
  const listener = await plugin.requestDidStart({
    context,
    logger,
    request: {},
  } as unknown as GraphQLRequestContext<ContextType>);

  expect(consoleSpy.mock.calls[0][0]).toContain(
    '[sourceIP] [userID] [clientName] [sessionID] [transactionID] [-]',
  );

  consoleSpy.mockReset();
  await listener.didEncounterErrors({
    errors: [new Error('test error')],
    context,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);
  expect(consoleSpy.mock.calls[0][0]).toContain(
    '[sourceIP] [userID] [clientName] [sessionID] [transactionID]',
  );
  expect(consoleSpy.mock.calls[0][0]).toContain('BFF Error');
  expect(consoleSpy.mock.calls[0][0]).toContain('errors: test error');

  consoleSpy.mockReset();
  await listener.willSendResponse({
    context,
    response: {
      data: {},
      errors: [],
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);
  expect(consoleSpy.mock.calls[0][0]).toContain(
    '[sourceIP] [userID] [clientName] [sessionID] [transactionID] [OK] -',
  );

  consoleSpy.mockReset();
  await listener.willSendResponse({
    context,
    errors: [{}],
    response: {
      data: {},
      errors: [{ message: 'Some error message' }],
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);
  expect(consoleSpy.mock.calls[0][0]).toContain(
    '[sourceIP] [userID] [clientName] [sessionID] [transactionID] [INTERNAL_SERVER_ERROR] -',
  );
  expect(consoleSpy.mock.calls[0][0]).toContain('BFF Response');
  expect(consoleSpy.mock.calls[0][0]).toContain(
    `errors: [{"message":"Some error message"}]`,
  );

  consoleSpy.mockRestore();
  process.env.SNZ_LOG_TESTING = undefined;
});
