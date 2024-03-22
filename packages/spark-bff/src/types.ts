import { DataSources } from 'datasources';
import { DESLDataSourceContext } from 'datasources/common/DESLDataSource';
import { IncomingMessage, ServerResponse } from 'http';

export interface LoggerContext {
  userID?: string;
  clientName?: string;
  transactionID?: string;
  sourceIP?: string;
  sessionID?: string;
}

export interface ContextType extends DESLDataSourceContext {
  dataSources: DataSources;
  loggerContext: LoggerContext;
  req?: IncomingMessage;
  res?: ServerResponse;
}

export interface AccessLoggerContext extends LoggerContext {
  statusCode?: string;
  duration?: number;
}
