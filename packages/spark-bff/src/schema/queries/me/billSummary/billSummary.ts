import { extendType, nullable, objectType, stringArg } from 'nexus';

export const BillBreakdownCharge = objectType({
  name: 'BillBreakdownCharge',
  description:
    'Object representing the charge summary associated with a billing period',
  definition(t) {
    t.string('type', {
      description: 'The type of aggregated charge',
    });
    t.float('value', {
      description: 'The NZD value of the charge',
    });
  },
});

export const BillBreakdown = objectType({
  name: 'BillBreakdown',
  description:
    'Object representing the breakdown of charges for a billing period',
  definition(t) {
    t.string('date', {
      description:
        'The ISO8601 formatted date-time when the digital bill was issued',
    });
    t.string('title', {
      description: 'The title associated with the digital bill',
    });
    t.string('billId', {
      description: 'The unique identifier for the digital bill',
    });
    t.list.field('charges', {
      type: BillBreakdownCharge,
      description: 'The charge summary associated with each billing period',
    });
  },
});

export const BillSummary = objectType({
  name: 'BillSummary',
  description: 'A summary of the billing activity associated with an account ',
  definition(t) {
    t.list.field('bills', {
      type: BillBreakdown,
      description: 'The breakdown of charges for each billing period',
    });
  },
});

export const BillSummaryArgs = {
  accountNumber: stringArg(),
  startDate: nullable(stringArg()),
  endDate: nullable(stringArg()),
};

export const BillSummaryQueryField = extendType({
  type: 'User',
  definition(t) {
    t.field('billSummary', {
      type: BillSummary,
      args: BillSummaryArgs,
      async resolve(
        _,
        { accountNumber, startDate, endDate },
        { dataSources: { digitalBillAPI } },
      ) {
        return digitalBillAPI.getAccountBillingSummary({
          accountNumber,
          startDate,
          endDate,
        });
      },
    });
  },
});
