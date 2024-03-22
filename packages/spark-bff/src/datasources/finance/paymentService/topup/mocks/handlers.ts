import { rest } from 'msw';
import autoTopupSuccess from './auto-topup-success.mock.json';
import autoTopupFailure from './auto-topup-failure.mock.json';
import deleteAutoTopupSuccess from './delete-auto-topup-success.mock.json';
import deleteAutoTopupFailure from './delete-auto-topup-failure.mock.json';
import voucherTopupSuccess from './voucherTopup-success.mock.json';
import voucherTopupFailure from './voucherTopup-failure.mock.json';
import voucherTopupUnAuthorisedLine from './voucherTopup-unAuthorised-line.mock.json';
import creditCardTopupAuthorisedLine from './ccTopup-authorised-line.mock.json';
import creditCardTopupUnauthorisedLine from './ccTopup-unauthorised-line.mock.json';
import creditCardTopupFailure from './ccTopup-failure.mock.json';
import voucherTopupInvalid from './voucherTopup-invalid.mock.json';
import topupPoliPayBillValidationFailure from './topupPoliPayBill-failure.mock.json';
import topupPoliPayBillSuccess from './topupPoliPayBill-success.mock.json';

const baseUrl = 'http://testhost/v1/finance/payment';

interface VoucherTopupMockBody {
  voucherNumber: string;
}
export const voucherTopupMock = rest.post<
  VoucherTopupMockBody,
  { lineNumber: string }
>(
  `${baseUrl}/voucher/topup/:lineNumber`,
  async ({ params: { lineNumber }, body: { voucherNumber } }, res, ctx) => {
    /* If the lineNumber does not match the given pattern, [0-9]+
    for example, 789046383,then it returns failure response, "Request validation failure."  */
    if (lineNumber.match(/^0\d+$/) !== null) {
      if (voucherNumber === '000000000000')
        return res(ctx.status(401), ctx.json(voucherTopupInvalid));
      return res(ctx.status(200), ctx.json(voucherTopupSuccess));
    }
    if (lineNumber === 'UnAuthorisedLine') {
      return res(ctx.status(200), ctx.json(voucherTopupUnAuthorisedLine));
    }
    return res(ctx.status(400), ctx.json(voucherTopupFailure));
  },
);

export const autoTopupMock = rest.post<unknown, { lineNumber: string }>(
  `${baseUrl}/creditcard/autotopup/:lineNumber`,
  async ({ params: { lineNumber } }, res, ctx) => {
    /* If the lineNumber does not match the given pattern, [0-9]+
    for example, 789046383,then it returns failure response, "Request validation failure."  */
    if (lineNumber.match(/^0\d+$/) !== null) {
      return res(ctx.status(200), ctx.json(autoTopupSuccess));
    }
    return res(ctx.status(400), ctx.json(autoTopupFailure));
  },
);

export const deleteAutoTopupMock = rest.delete<unknown, { lineNumber: string }>(
  `${baseUrl}/creditcard/autotopup/:lineNumber`,
  async ({ params: { lineNumber } }, res, ctx) => {
    /* If the lineNumber does not match the given pattern, [0-9]+
    for example, 789046383,then it returns failure response, "Request validation failure."  */
    if (lineNumber.match(/^0\d+$/) !== null) {
      return res(ctx.status(200), ctx.json(deleteAutoTopupSuccess));
    }
    return res(ctx.status(400), ctx.json(deleteAutoTopupFailure));
  },
);

export const creditCardTopupMock = rest.post<unknown, { lineNumber: string }>(
  `${baseUrl}/creditcard/topup/:lineNumber`,
  ({ params: { lineNumber } }, res, ctx) => {
    if (lineNumber.match(/^0\d+$/) !== null) {
      return res(ctx.status(200), ctx.json(creditCardTopupUnauthorisedLine));
    }
    if (lineNumber === 'AuthorisedLine') {
      return res(ctx.status(200), ctx.json(creditCardTopupAuthorisedLine));
    }
    return res(ctx.status(400), ctx.json(creditCardTopupFailure));
  },
);

export const addTopupPoliPayBillMock = rest.post<
  unknown,
  { lineNumber: string }
>(
  `${baseUrl}/polipay/topup/:lineNumber`,
  async ({ params: { lineNumber } }, res, ctx) => {
    /* If the lineNumber does not match the given pattern, [0-9]+
    for example, 789046383,then it returns failure response, "Request validation failure."  */
    if (lineNumber.match(/^\d+$/) === null) {
      return res(ctx.status(400), ctx.json(topupPoliPayBillValidationFailure));
    }
    return res(ctx.status(200), ctx.json(topupPoliPayBillSuccess));
  },
);

const handlers = [
  creditCardTopupMock,
  voucherTopupMock,
  autoTopupMock,
  addTopupPoliPayBillMock,
  deleteAutoTopupMock,
];

export default handlers;
