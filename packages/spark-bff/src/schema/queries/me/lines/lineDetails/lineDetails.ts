import { objectType, queryField, stringArg } from 'nexus';

export const TopupCardDetails = objectType({
  name: 'TopupCardDetails',
  description:
    'Object to hold fields for card details associated with the topup setting',
  definition(t) {
    t.string('lastFourDigits', {
      description: 'Last four digits of the card',
    });
  },
});

export const TopupSettings = objectType({
  name: 'TopupSettings',
  description: 'Topup settings associated with the line',
  definition(t) {
    t.field('cardDetails', {
      type: TopupCardDetails,
      description: 'Card details associated with the topup setting',
    });
    t.float('topupAmount', {
      description: 'Topup amount of the topup setting',
    });
    t.nullable.string('nextPaymentDate', {
      description:
        'Upcoming payment date of the RT and RT28 payment preference',
    });
    t.nullable.float('monthlyTopupLimit', {
      description:
        'Maximum monthly topup limit for low balance payment preference',
    });
    t.nullable.float('thresholdAmount', {
      description:
        'Threshlold amount to trigger low balance auto topup payment preference',
    });
  },
});

export const AutoTopupDetails = objectType({
  name: 'AutoTopupDetails',
  definition(t) {
    t.list.field('topupSettings', {
      type: TopupSettings,
      description: 'Topup settings associated with the line',
    });
  },
});

export const LineDetails = objectType({
  name: 'LineDetails',
  description:
    'Object to hold fields for card details associated with the topup setting',
  definition(t) {
    t.nullable.field('autoTopupDetails', {
      type: AutoTopupDetails,
      description: 'Auto topup details of the line',
    });
  },
});

export const LineDetailsQuery = queryField('lineDetails', {
  type: LineDetails,
  args: { lineNumber: stringArg() },
  async resolve(_, { lineNumber }, { dataSources: { lineDetailsAPI } }) {
    return lineDetailsAPI.getAutoTopupDetails(lineNumber);
  },
});
