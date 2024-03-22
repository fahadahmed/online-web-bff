import LogEvent, { LoggerType } from './LogEvent';
import { AccessLoggerContext } from '../../types';

interface AccessLogEventConstructorParameter {
  message: string;
  context?: AccessLoggerContext;
}

export default class AccessLogEvent extends LogEvent<AccessLoggerContext> {
  constructor({ message, context = {} }: AccessLogEventConstructorParameter) {
    super(message, context, LoggerType.ACCESS);
  }
}
