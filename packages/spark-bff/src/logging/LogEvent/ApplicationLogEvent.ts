import { LoggerContext } from 'types';
import LogEvent, { LoggerType } from './LogEvent';

interface ApplicationLogEventConstructorParameter {
  message: string;
  context?: LoggerContext;
}

export default class ApplicationLogEvent extends LogEvent {
  constructor({
    message,
    context = {},
  }: ApplicationLogEventConstructorParameter) {
    super(message, context, LoggerType.APPLICATION);
  }
}
