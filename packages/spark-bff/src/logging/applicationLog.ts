import { createLogger, format } from 'winston';
import { createLoggerTransports, WinstonLibMeta } from './common';
import { LoggerContext } from '../types';

const { printf, combine, timestamp } = format;

const applicationLogFormat = printf(
  ({
    timestamp: ts = '-',
    level,
    sourceIP = '-',
    userID = '-',
    clientName = '-',
    sessionID = '-',
    transactionID = '-',
    message = '-',
  }: LoggerContext & WinstonLibMeta) => {
    return `${ts} ${level.toUpperCase()} [${sourceIP}] [${userID}] [${clientName}] [${sessionID}] [${transactionID}] ${message}`;
  },
);

export function createApplicationLogger(dirname?: string) {
  return createLogger({
    level: 'debug',
    format: combine(timestamp(), applicationLogFormat),
    transports: createLoggerTransports({
      dirname,
      filename: 'application-%DATE%.log',
    }),
  });
}
