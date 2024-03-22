import { inputObjectType, mutationField, objectType } from 'nexus';

const VoucherResponse = objectType({
  name: 'VoucherResponse',
  definition(t) {
    t.float('redeemedAmount', {
      description: 'The amount redeemed from the voucher',
    });
    t.nullable.string('receiptNumber', {
      description: 'The transaction receipt number',
    });
    t.nullable.float('availableBalance', {
      description: 'The balance available after payment processing',
    });
    t.nullable.float('reservedBalance', {
      description: 'The reserved balance available after payment processing',
    });
  },
});

const VoucherTopupResponse = objectType({
  name: 'VoucherTopupResponse',
  description: 'The response object of a voucher topup',
  definition(t) {
    t.implements('GenericMutationResponse');
    t.nullable.field('voucherResponse', {
      type: VoucherResponse,
    });
  },
});

const VoucherPaymentInput = inputObjectType({
  name: 'VoucherPaymentInput',
  description:
    'Object containing input fields required to process a voucher topup',
  definition(t) {
    t.string('voucherNumber', {
      description: 'The voucher number',
    });
    t.string('lineNumber', {
      description: 'The line number for which the topup has to happen',
    });
  },
});

export const ProcessVoucherPayment = mutationField('processVoucherPayment', {
  type: VoucherTopupResponse,
  description: 'Performs a topup on a line number using a voucher',
  args: { input: VoucherPaymentInput },
  resolve(_, { input }, { dataSources: { topupAPI } }) {
    return topupAPI.processVoucherPayment(input);
  },
});
