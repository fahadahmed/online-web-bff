import ApolloLogger from './ApolloLogger';
import { AccessLogEvent, ApplicationLogEvent } from './LogEvent';

test('logger writes log messages', () => {
  process.env.SNZ_LOG_TESTING = '1';

  const consoleSpy = jest
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-underscore-dangle
    .spyOn((console as any)._stderr, 'write')
    .mockImplementation(() => {
      /* noop */
    });

  const logger = new ApolloLogger({ logDirname: __dirname });

  consoleSpy.mockReset();
  logger.error(
    new ApplicationLogEvent({
      message: 'test application error with meta',
      context: {
        sourceIP: 'sourceIP',
        userID: 'userID',
        clientName: 'clientName',
        sessionID: 'sessionID',
        transactionID: 'transactionID',
      },
    }),
  );
  expect(consoleSpy.mock.calls[0][0]).toContain(
    'ERROR [sourceIP] [userID] [clientName] [sessionID] [transactionID] test application error with meta',
  );

  consoleSpy.mockReset();
  logger.debug(
    new AccessLogEvent({
      message: 'test access debug with meta',
      context: {
        sourceIP: 'sourceIP',
        userID: 'userID',
        clientName: 'clientName',
        sessionID: 'sessionID',
        transactionID: 'transactionID',
        statusCode: 'OK',
        duration: 12345,
      },
    }),
  );
  expect(consoleSpy.mock.calls[0][0]).toContain(
    '[sourceIP] [userID] [clientName] [sessionID] [transactionID] [OK] - test access debug with meta (12345 ms)',
  );

  consoleSpy.mockRestore();
  process.env.SNZ_LOG_TESTING = undefined;
});
