import { inputObjectType, mutationField, objectType } from 'nexus';

export const AddConnectionPromiseLineInput = inputObjectType({
  name: 'AddConnectionPromiseLineInput',
  description: 'Detail object of Connection Promise request data.',
  definition(t) {
    t.string('lineNumber', {
      description:
        'The Spark mobile number to be associated with this Connection Promise.',
    });
    t.boolean('primaryLine', {
      description:
        'A flag to indicate if the Spark mobile line is considered a primary or secondary alternative connection.',
    });
  },
});

export const AddConnectionPromiseLineResponse = objectType({
  name: 'AddConnectionPromiseLineResponse',
  description:
    'Object having fields for add connection promise results response',
  definition(t) {
    t.implements('GenericMutationResponse');
    t.nullable.string('connectionPromiseId', {
      description: 'The unique identifier for the Connection Promise record',
    });
  },
});

export const AddConnectionPromiseLine = mutationField(
  'addConnectionPromiseLine',
  {
    type: AddConnectionPromiseLineResponse,
    description:
      'Create a new Connection Promise record associated with the nominated line number.',
    args: { input: AddConnectionPromiseLineInput },
    resolve(_, { input }, { dataSources: { connectionPromiseAPI } }) {
      return connectionPromiseAPI.addConnectionPromiseLine(input);
    },
  },
);
