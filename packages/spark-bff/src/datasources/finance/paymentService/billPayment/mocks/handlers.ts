import { rest } from 'msw';
import poliPayBillSuccess from './poliPayBill-success.mock.json';
import poliPayBillValidationFailure from './poliPayBill-failure.mock.json';
import creditCardPayBillSuccess from './creditCard-payBill-success.mock.json';
import creditCardPayBillValidationFailure from './creditCard-payBill-failure.mock.json';
import deleteAutoPayBillSuccess from './delete-autoPayBill-success.mock.json';
import deleteAutoPayBillFailure from './delete-autoPayBill-failure.mock.json';

const baseUrl = 'http://testhost/v1/finance/payment';

export const addPoliPayBillMock = rest.post<unknown, { accountNumber: string }>(
  `${baseUrl}/polipay/bill/:accountNumber`,
  async ({ params: { accountNumber } }, res, ctx) => {
    /* If the accountNumber does not match the given pattern, [0-9]+
    for example, 789046383,then it returns failure response, "Request validation failure."  */
    if ((accountNumber as string).match(/^\d+$/) === null) {
      return res(ctx.status(400), ctx.json(poliPayBillValidationFailure));
    }
    return res(ctx.status(200), ctx.json(poliPayBillSuccess));
  },
);

export const addCreditCardPayBillMock = rest.post<
  unknown,
  { accountNumber: string }
>(
  `${baseUrl}/creditcard/bill/:accountNumber`,
  async ({ params: { accountNumber } }, res, ctx) => {
    /* If the accountNumber does not match the given pattern, [0-9]+
    for example, 789046383,then it returns failure response, "Request validation failure."  */
    if (accountNumber.match(/^\d+$/) === null) {
      return res(ctx.status(400), ctx.json(creditCardPayBillValidationFailure));
    }
    return res(ctx.status(200), ctx.json(creditCardPayBillSuccess));
  },
);

export const deleteAutoPayBillMock = rest.delete<
  unknown,
  { accountNumber: string; paymentMethodId: string }
>(
  `${baseUrl}/bill/:accountNumber/paymentsetup/:paymentMethodId`,
  async ({ params: { accountNumber, paymentMethodId } }, res, ctx) => {
    /** If accountNumber does not match the given pattern,
     for example, 746738998.
     Or If paymentMethodId does not match the given pattern,
     for example,"1-S0123-23"
     it returns failure response, "Request Validation Failure".
     */
    if (
      accountNumber.match(/^\d+$/) === null ||
      paymentMethodId.match(/^[\dA-Z][\dA-Z-]+[\dA-Z]$/) === null
    ) {
      return res(ctx.status(400), ctx.json(deleteAutoPayBillFailure));
    }
    return res(ctx.status(200), ctx.json(deleteAutoPayBillSuccess));
  },
);

const handlers = [
  addCreditCardPayBillMock,
  addPoliPayBillMock,
  deleteAutoPayBillMock,
];

export default handlers;
