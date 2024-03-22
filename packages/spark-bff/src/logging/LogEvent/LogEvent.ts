import { LoggerContext } from 'types';

export enum LoggerType {
  APPLICATION,
  ACCESS,
}

export default class LogEvent<TContext extends LoggerContext = LoggerContext> {
  constructor(
    public message: string,
    public context: TContext,
    public type: LoggerType,
  ) {}
}
