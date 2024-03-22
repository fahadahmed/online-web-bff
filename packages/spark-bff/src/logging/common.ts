import { transports } from 'winston';
import 'winston-daily-rotate-file';

export interface WinstonLibMeta {
  timestamp?: string;
  level: string;
  message: string;
}

export abstract class MessageWithMeta<TMeta> {
  constructor(readonly message: string, readonly meta: TMeta) {}
}

interface CreateTransportsConfig {
  filename: string;
  dirname?: string;
}

export function createLoggerTransports({
  dirname,
  filename,
}: CreateTransportsConfig) {
  const loggerTransports = [];
  /* istanbul ignore if */
  if (process.env.NODE_ENV === 'production' && !process.env.CI) {
    try {
      loggerTransports.push(
        new transports.DailyRotateFile({
          filename,
          dirname,
          maxSize: '100m',
          maxFiles: 10,
        }),
      );
    } catch (exception) {
      const error = exception as Error;
      // eslint-disable-next-line no-console
      console.log(error.message, error.stack);
    }
  } else if (
    process.env.NODE_ENV === 'development' ||
    process.env.SNZ_LOG_TESTING
  ) {
    loggerTransports.push(new transports.Console());
  } else if (process.env.NODE_ENV === 'test') {
    loggerTransports.push(new transports.Console({ silent: true }));
  }

  return loggerTransports;
}
