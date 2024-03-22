import { FieldResolver } from 'nexus';

export const resolveSetPrepaidAutoTopup: FieldResolver<
  'Mutation',
  'setPrepaidAutoTopup'
> = async (
  _,
  { input, creditCardInput, isNewCreditCard },
  { dataSources: { topupAPI, walletServiceAPI } },
) => {
  if (isNewCreditCard) {
    const {
      addWalletPaymentMethodResponse: { paymentMethodId },
    } = await walletServiceAPI.postCreditCardToWallet(creditCardInput);
    return topupAPI.setPrepaidAutoTopupAndSaveCard(input, paymentMethodId);
  }
  return topupAPI.setPrepaidAutoTopupWithRegisteredCard(input);
};
