import { FieldResolver } from 'nexus';

export const resolveCreditCardTopup: FieldResolver<
  'Mutation',
  'creditCardTopup'
> = async (
  _,
  { input, creditCardInput, lineNumber, shouldSaveCard, isNewCreditCard },
  { dataSources: { topupAPI, walletServiceAPI } },
) => {
  if (isNewCreditCard) {
    if (shouldSaveCard) {
      const {
        addWalletPaymentMethodResponse: { paymentMethodId },
      } = await walletServiceAPI.postCreditCardToWallet(creditCardInput);
      return topupAPI.postCreditCardTopupPaymentAndSaveCard(
        input,
        lineNumber,
        paymentMethodId,
      );
    }
    const { oneTimeToken } = creditCardInput.cardDetail;
    return topupAPI.postCreditCardTopupPayment(input, lineNumber, oneTimeToken);
  }
  return topupAPI.postCreditCardTopupPaymentWithRegisteredCard(
    input,
    lineNumber,
  );
};
