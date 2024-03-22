import { extendType, objectType, stringArg } from 'nexus';

export const ConnectionPromiseLine = objectType({
  name: 'ConnectionPromiseLine',
  description: 'Detail object of line associated with connection promise.',
  definition(t) {
    t.string('connectionPromiseId', {
      description: 'The unique identifier for the connection promise record',
    });
    t.string('lineNumber', {
      description:
        'The spark mobile line number associated with this connection promise.',
    });
    t.boolean('primaryLine', {
      description:
        'A flag to indicate if the Spark mobile line is considered a primary (20GB data over 7 days) or secondary (5GB data over 7 days) alternative connection.',
    });
  },
});

export const ConnectionPromiseLinesResponse = objectType({
  name: 'ConnectionPromiseLinesResponse',
  description: 'Object having fields for connection promise results response',
  definition(t) {
    t.nullable.list.field('lines', {
      type: ConnectionPromiseLine,
      description:
        'A list of line details associated with this connection promise.',
    });
  },
});

export const ConnectionPromise = extendType({
  type: 'User',
  definition(t) {
    t.field('connectionPromise', {
      type: ConnectionPromiseLinesResponse,
      description:
        'The connection promise API return the connection promise configuration for the nominated line number',
      args: { lineNumber: stringArg() },
      async resolve(_, params, { dataSources: { connectionPromiseAPI } }) {
        const { lineNumber } = params;
        return connectionPromiseAPI.getConnectionPromiseLines(lineNumber);
      },
    });
  },
});
