import { inputObjectType, mutationField, objectType } from 'nexus';

export const DeleteConnectionPromiseLineInput = inputObjectType({
  name: 'DeleteConnectionPromiseLineInput',
  description:
    'Object containing input fields for deleting connection promise line',
  definition(t) {
    t.string('lineNumber', {
      description:
        'The Spark mobile number to be associated with this Connection Promise.',
    });
    t.string('connectionPromiseId', {
      description: 'The unique identifier for the Connection Promise record',
    });
  },
});

export const DeleteConnectionPromiseLineResponse = objectType({
  name: 'DeleteConnectionPromiseLineResponse',
  description:
    'Object having fields for delete connection promise results response',
  definition(t) {
    t.implements('GenericMutationResponse');
  },
});

export const DeleteConnectionPromiseLine = mutationField(
  'deleteConnectionPromiseLine',
  {
    type: DeleteConnectionPromiseLineResponse,
    description:
      'Delete an existing Connection Promise record associated with the nominated line number.',
    args: { input: DeleteConnectionPromiseLineInput },
    resolve(_, { input }, { dataSources: { connectionPromiseAPI } }) {
      return connectionPromiseAPI.deleteConnectionPromiseLine(input);
    },
  },
);
