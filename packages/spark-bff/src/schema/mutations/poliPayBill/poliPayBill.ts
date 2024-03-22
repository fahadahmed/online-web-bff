import { objectType, inputObjectType, mutationField } from 'nexus';

export const PoliPayBillInput = inputObjectType({
  name: 'PoliPayBillInput',
  description: 'input object to hold fields for poli pay bill.',
  definition(t) {
    t.string('accountNumber', {
      description: 'The account number for which the bill has to be paid.',
    });
    t.nullable.float('amount', {
      description: 'The amount to be paid in NZD.',
    });
    t.field('amountType', {
      type: 'AmountType',
      description: 'Indicates the payBill amount type.',
    });
  },
});

export const RestOfPoliPayBillResponse = objectType({
  name: 'RestOfPoliPayBillResponse',
  description: 'object containing fields for rest of the poliPayBill response.',
  definition(t) {
    t.string('token', {
      description: 'the token given by polipay to identify the transaction.',
    });
    t.string('redirectUrl', {
      description: 'the polipay page to redirect to.',
    });
  },
});

export const PoliPayBillResponse = objectType({
  name: 'PoliPayBillResponse',
  description: 'object containing fields for poliPayBill response.',
  definition(t) {
    t.implements('GenericMutationResponse');
    t.nullable.field('poliPayResponse', {
      type: RestOfPoliPayBillResponse,
      description: 'rest of the poliPayBill response.',
    });
  },
});

export const PoliPayBill = mutationField('initiatePOLi', {
  type: PoliPayBillResponse,
  description: 'Pay a specific bill or balance via POLi pay.',
  args: { input: PoliPayBillInput },
  async resolve(_, { input }, { dataSources: { billPaymentAPI } }) {
    return billPaymentAPI.postPoliPayment(input);
  },
});
