import { Logger as WinstonLogger } from 'winston';
import { Logger as ApolloLibLogger } from 'apollo-server-types';
import { createApplicationLogger } from './applicationLog';
import { createAccessLogger } from './accessLog';
import LogEvent, { LoggerType } from './LogEvent/LogEvent';

export default class ApolloLogger implements ApolloLibLogger {
  private readonly loggers: WinstonLogger[] = [];

  constructor({ logDirname }: { logDirname?: string } = {}) {
    this.loggers[LoggerType.APPLICATION] = createApplicationLogger(logDirname);
    this.loggers[LoggerType.ACCESS] = createAccessLogger(logDirname);
  }

  debug<TLogEvent extends LogEvent>({ message, context, type }: TLogEvent) {
    this.loggers[type].debug(message, context);
  }

  info<TLogEvent extends LogEvent>({ message, context, type }: TLogEvent) {
    this.loggers[type].info(message, context);
  }

  warn<TLogEvent extends LogEvent>({ message, context, type }: TLogEvent) {
    this.loggers[type].warn(message, context);
  }

  error<TLogEvent extends LogEvent>({ message, context, type }: TLogEvent) {
    this.loggers[type].error(message, context);
  }
}
