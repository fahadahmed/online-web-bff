import { extendType, nullable, objectType, stringArg } from 'nexus';
import { CartChannel } from '../../../../common';

export const EligibleLine = objectType({
  name: 'EligibleLine',
  definition(t) {
    t.string('accountNumber', {
      description:
        'The account number associated with the eligible line number.',
    });
    t.string('lineNumber', {
      description: 'The line number that the product offer is eligible for.',
    });
    t.string('offerId', {
      description:
        'The current plan offer ID associated to the eligible line number.',
    });
    t.string('offerName', {
      description:
        'The customer-facing name of the current plan associated to the eligible line number.',
    });
  },
});

export const EligibleLinesArgs = {
  offerId: stringArg(),
  accountNumber: nullable(stringArg()),
  channel: CartChannel,
};

export const EligibleLinesQuery = extendType({
  type: 'User',
  definition(t) {
    t.list.field('eligibleLines', {
      type: EligibleLine,
      args: EligibleLinesArgs,
      description: 'List of eligibleLine objects',
      async resolve(
        _,
        { offerId, accountNumber, channel },
        { dataSources: { productDetailsAPI } },
      ) {
        return productDetailsAPI.getEligibleLines(
          offerId,
          channel,
          accountNumber,
        );
      },
    });
  },
});
