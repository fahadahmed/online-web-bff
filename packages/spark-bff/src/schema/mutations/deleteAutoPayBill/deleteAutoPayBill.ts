import { objectType, inputObjectType, mutationField } from 'nexus';

export const DeleteAutoPayBillResponse = objectType({
  name: 'DeleteAutoPayBillResponse',
  description:
    'object to hold fields for response when deregistering a card or bank for automatic bill payment',
  definition(t) {
    t.implements('GenericMutationResponse');
  },
});

export const DeleteAutoPayBillInput = inputObjectType({
  name: 'DeleteAutoPayBillInput',
  description:
    'input object having fields for removing existing monthly payment.',
  definition(t) {
    t.string('accountNumber', {
      description:
        'The account number for which automatic bill payment setup to be removed if the given registered paymentmethodid is valid.',
    });
    t.string('paymentMethodId', {
      description: 'the unique identifier of this payment method.',
    });
  },
});

export const DeleteAutoPayBill = mutationField('removeExistingMonthlyPayment', {
  type: DeleteAutoPayBillResponse,
  description: 'DeRegister a card or bank for automatic bill payment.',
  args: { input: DeleteAutoPayBillInput },
  resolve(_, { input }, { dataSources: { billPaymentAPI } }) {
    return billPaymentAPI.deleteAutoPayBill(input);
  },
});
