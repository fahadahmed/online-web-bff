import { FieldResolver } from 'nexus';

export const resolveCreditCardPayBill: FieldResolver<
  'Mutation',
  'creditCardPayBill'
> = async (
  _,
  { input, creditCardInput, shouldSaveCard, isNewCreditCard },
  { dataSources: { billPaymentAPI, walletServiceAPI } },
) => {
  if (isNewCreditCard) {
    if (shouldSaveCard) {
      const {
        addWalletPaymentMethodResponse: { paymentMethodId },
      } = await walletServiceAPI.postCreditCardToWallet(creditCardInput);

      return billPaymentAPI.postNewCardOneoffBillPaymentAndSaveCard(
        input,
        paymentMethodId,
      );
    }
    const { oneTimeToken } = creditCardInput.cardDetail;
    return billPaymentAPI.postNewCardOneoffBillPayment(input, oneTimeToken);
  }
  return billPaymentAPI.postCCPaymentWithRegisteredCard(input);
};
