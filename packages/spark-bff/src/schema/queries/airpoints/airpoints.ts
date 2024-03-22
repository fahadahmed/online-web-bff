import { objectType, stringArg, queryField } from 'nexus';

export const AirpointsArgs = {
  accountNumber: stringArg(),
};

export const AirpointsResponse = objectType({
  name: 'AirpointsResponse',
  description: 'Airpoints details',
  definition(t) {
    t.string('airpointsNumber');
    t.string('firstName');
    t.string('lastName');
    t.string('status');
  },
});

export const Airpoints = queryField('airpoints', {
  type: AirpointsResponse,
  args: AirpointsArgs,
  description: 'Airpoints for account',
  async resolve(_, { accountNumber }, { dataSources: { airPointsAPI } }) {
    return airPointsAPI.getAirpointsData(accountNumber);
  },
});
