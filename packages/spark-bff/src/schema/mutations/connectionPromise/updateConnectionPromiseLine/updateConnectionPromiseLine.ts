import { inputObjectType, mutationField, objectType } from 'nexus';

export const UpdateConnectionPromiseLineInput = inputObjectType({
  name: 'UpdateConnectionPromiseLineInput',
  description:
    'Object containing input fields for updating connection promise line',
  definition(t) {
    t.string('lineNumber', {
      description:
        'The Spark mobile number to be associated with this Connection Promise.',
    });
    t.string('connectionPromiseId', {
      description: 'The unique identifier for the Connection Promise record',
    });
    t.boolean('primaryLine', {
      description:
        'A flag to indicate if the Spark mobile line is considered a primary or secondary alternative connection.',
    });
  },
});

export const UpdateConnectionPromiseLineResponse = objectType({
  name: 'UpdateConnectionPromiseLineResponse',
  description:
    'Object having fields for update connection promise results response',
  definition(t) {
    t.implements('GenericMutationResponse');
  },
});

export const UpdateConnectionPromiseLine = mutationField(
  'updateConnectionPromiseLine',
  {
    type: UpdateConnectionPromiseLineResponse,
    description:
      'Update an existing Connection Promise record associated with the nominated line number.',
    args: { input: UpdateConnectionPromiseLineInput },
    resolve(_, { input }, { dataSources: { connectionPromiseAPI } }) {
      return connectionPromiseAPI.updateConnectionPromiseLine(input);
    },
  },
);
