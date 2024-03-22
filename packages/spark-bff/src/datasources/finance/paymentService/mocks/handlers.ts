import { rest } from 'msw';
import SuccessResponseMock from './register-card-success-response.json';
import FailedResponse from './register-card-failed-response.json';

const baseUrl = 'http://testhost/v1/finance/payment';

export const registerCardHandler = rest.post(
  `${baseUrl}/creditcard/:lineNumber`,
  async ({ params: { lineNumber } }, res, ctx) => {
    if (lineNumber === '0276404521') {
      return res(ctx.status(500), ctx.json(FailedResponse));
    }
    return res(ctx.status(200), ctx.json(SuccessResponseMock));
  },
);

const handlers = [registerCardHandler];

export default handlers;
