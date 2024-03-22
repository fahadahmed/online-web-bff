import { inputObjectType, objectType, mutationField } from 'nexus';

export const DeleteAirpointsInput = inputObjectType({
  name: 'DeleteAirpointsInput',
  description: 'Input for deleting airpoints for an account',
  definition(t) {
    t.string('accountNumber', {
      description: 'Account number to delete airpoints from',
    });
    t.string('status', {
      description:
        'the status to be passed in and set as InActive to invalidate airpoints',
    });
  },
});

export const AirpointsDeleteResponse = objectType({
  name: 'AirpointsDeleteResponse',
  description:
    'object to hold fields for response when deleting an airpoints card from account',
  definition(t) {
    t.implements('GenericMutationResponse');
  },
});

export const DeleteAirpoints = mutationField('deleteAirpoints', {
  type: AirpointsDeleteResponse,
  description: 'Deletes airpoints number for an account',
  args: { input: DeleteAirpointsInput },
  async resolve(_, params, { dataSources: { airPointsAPI } }) {
    const { input } = params;
    return airPointsAPI.deleteAirpoints(input);
  },
});
