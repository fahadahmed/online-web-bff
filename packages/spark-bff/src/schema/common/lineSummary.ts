import { objectType, enumType } from 'nexus';

export const LineType = enumType({
  name: 'LineType',
  members: ['MOBILE_PREPAID', 'MOBILE_POSTPAID', 'BROADBAND', 'UNKNOWN'],
  description: 'The type of service the usage is for',
});

export const LineSummary = objectType({
  name: 'LineSummary',
  definition(t) {
    t.string('accountNumber', {
      description: 'The account number associated with the line.',
    });
    t.field('balanceManagement', {
      type: 'BalanceManagement',
      description: 'How the customer chooses to pay for the line',
    });
    t.nullable.field('type', {
      type: LineType,
      description: 'This is identifier for the line',
    });
    t.string('lineNumber', {
      description: 'The line number.',
    });
    t.string('status', {
      description: 'The status of the asset associated with the line.',
    });
    t.string('offerId', {
      description:
        'Offer ID of the primary product associated with the line number.',
    });
    t.string('offerName', {
      description:
        'The name of the primary product associated with the line number',
    });
    t.nullable.string('parentLine', {
      description:
        'Offer ID of the primary product associated with the line number.',
    });
    t.list.string('secondaryLineNumbers', {
      description:
        'The array of secondary line numbers strings if the line is a leader within a group. If no secondary lines are associated with this line then an empty array is returned.',
    });
    t.nullable.string('planType', {
      description: 'The type of plan associated with the line.',
    });
    t.nullable.string('packageId', {
      description: 'The identifier of the package associated with the line',
    });
  },
});
