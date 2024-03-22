import { createLogger, format } from 'winston';
import { createLoggerTransports, WinstonLibMeta } from './common';
import { AccessLoggerContext } from '../types';

const { printf, combine, timestamp } = format;

const accessLogFormat = printf(
  ({
    timestamp: ts = '-',
    sourceIP = '-',
    userID = '-',
    clientName = '-',
    sessionID = '-',
    transactionID = '-',
    message = '-',
    statusCode = '-',
    duration = 0,
  }: AccessLoggerContext & WinstonLibMeta) => {
    return `${ts} [${sourceIP}] [${userID}] [${clientName}] [${sessionID}] [${transactionID}] [${statusCode}] - ${message} (${duration} ms)`;
  },
);

export function createAccessLogger(dirname?: string) {
  return createLogger({
    level: 'debug',
    format: combine(timestamp(), accessLogFormat),
    transports: createLoggerTransports({
      dirname,
      filename: 'access-%DATE%.log',
    }),
  });
}
