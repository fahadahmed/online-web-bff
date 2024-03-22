import { nullable, objectType, queryField, stringArg } from 'nexus';

export const A2POrganisationDetails = objectType({
  name: 'A2POrganisationDetails',
  description: 'Organisation details',
  definition(t) {
    t.nullable.string('customerNumber', {
      description: 'Customer number',
    });
  },
});

export const a2pOrganisationDetailsQuery = queryField((t) => {
  t.field('a2p', {
    type: A2POrganisationDetails,
    args: {
      customerNumber: nullable(stringArg({ description: 'Customer number' })),
    },
    resolve(_, { customerNumber }) {
      return {
        customerNumber,
      };
    },
  });
});
