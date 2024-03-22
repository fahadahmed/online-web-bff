import { inputObjectType, mutationField } from 'nexus';

export const TopupPoliPayBillInput = inputObjectType({
  name: 'TopupPoliPayBillInput',
  description: 'input object to hold fields for top up poli pay bill.',
  definition(t) {
    t.string('lineNumber', {
      description: 'The account number for which the bill has to be paid.',
    });
    t.nullable.float('amount', {
      description: 'The amount to be paid in NZD.',
    });
  },
});

export const topupPoliPayBill = mutationField('initiateTopPOLi', {
  type: 'PoliPayBillResponse',
  description: 'Pay a specific bill or balance via POLi pay.',
  args: { input: TopupPoliPayBillInput },
  async resolve(_, { input }, { dataSources: { topupAPI } }) {
    return topupAPI.processTopupPoliPay(input);
  },
});
