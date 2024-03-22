import { rest } from 'msw';
import { operations } from 'generated/typings/walletService';

import walletPaymentMethod from './wallet-paymentMethods.mock.json';
import addWalletPaymentMethodSuccess from './add-wallet-payment-method-success.mock.json';
import addWalletPaymentMethodFailure from './add-wallet-payment-method-failure.mock.json';
import addWalletBankAccountFailure from './add-wallet-bank-account-failure.mock.json';
import addWalletCreditCardFailure from './addWalletCreditCard-failure.mock.json';
import addWalletCreditCardValidationFailure from './addWalletCreditCard-validation-failure.mock.json';

const baseUrl = 'http://testhost/v1/finance/wallet/me';

export const walletPaymentMethodMock = rest.get(`${baseUrl}`, (_, res, ctx) => {
  return res(ctx.json(walletPaymentMethod));
});

export const addWalletPaymentMethodMock = rest.post<
  operations['addPaymentMethod']['parameters']['body']['paymentMethod']
>(
  `${baseUrl}`,
  async ({ body: { type, bankAccountDetail, cardDetail } }, res, ctx) => {
    if (type === 'BANK') {
      if (bankAccountDetail.bankName) {
        if (bankAccountDetail.accountNumber) {
          if (bankAccountDetail.accountName) {
            return res(
              ctx.status(200),
              ctx.json(addWalletPaymentMethodSuccess),
            );
          }
        }
      }
      return res(ctx.status(400), ctx.json(addWalletBankAccountFailure));
    }

    /* when maskedCardNumber does not match the given pattern,
     it returns failure response,"Request validation failure."
    maskedCardNumber accepts [0-9] and asterisk(*), input length is 16.
    for example, 123412******3443 */
    if (
      cardDetail.maskedCardNumber &&
      cardDetail.maskedCardNumber.match(/^[\d*]{16}$/) === null
    ) {
      return res(
        ctx.status(400),
        ctx.json(addWalletCreditCardValidationFailure),
      );
    }

    /* when neither oneTimeToken nor secureTransactionToken is provided to add card to wallet,
       then it returns failure response,"Either OneTimeToken Or SecureTransactionToken is mandatory for add a card to wallet." */
    if (!cardDetail.oneTimeToken) {
      if (!cardDetail.secureTransactionToken) {
        return res(ctx.status(400), ctx.json(addWalletCreditCardFailure));
      }
    }

    /* when both oneTimeToken and secureTransactionToken are provided to add card to wallet,
       then it returns failure response,"BAD REQUEST". */
    if (cardDetail.oneTimeToken) {
      if (cardDetail.secureTransactionToken) {
        return res(ctx.status(400), ctx.json(addWalletPaymentMethodFailure));
      }
    }

    /* when either oneTimeToken Or secureTransactionToken is provided along with the other valid inputs to add card to wallet,
       then it returns success response,"Request successfully processed". */
    return res(ctx.status(200), ctx.json(addWalletPaymentMethodSuccess));
  },
);

const handlers = [walletPaymentMethodMock, addWalletPaymentMethodMock];

export default handlers;
