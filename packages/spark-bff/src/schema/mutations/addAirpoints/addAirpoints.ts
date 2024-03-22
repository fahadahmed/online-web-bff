import { inputObjectType, objectType, mutationField } from 'nexus';

export const AddAirpointsInput = inputObjectType({
  name: 'AddAirpointsInput',
  description: 'Input for adding airpoints to an account',
  definition(t) {
    t.string('accountNumber', {
      description: 'Account number to add airpoints to',
    });
    t.string('airpointsNumber', {
      description: 'The airpoints card number to be added',
    });
    t.string('firstName', {
      description:
        'First name taken from the Spark Identity of the current user.',
    });
    t.string('lastName', {
      description:
        'Last name taken from the Spark Identity of the current user.',
    });
    t.string('status', {
      description: 'The status passed in to be set to equal Active',
    });
  },
});

export const AirpointsUpdateResponse = objectType({
  name: 'AirpointsUpdateResponse',
  definition(t) {
    t.implements('GenericMutationResponse');
  },
});

export const AddAirpoints = mutationField('addAirpoints', {
  type: AirpointsUpdateResponse,
  description: 'Adds airpoints number to account',
  args: { input: AddAirpointsInput },
  async resolve(_, params, { dataSources: { airPointsAPI } }) {
    const { input } = params;
    return airPointsAPI.addAirpoints(input);
  },
});
