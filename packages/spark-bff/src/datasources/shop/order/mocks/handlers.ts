import { rest } from 'msw';
import submitOrderSuccessResponseMock from './submit-order-success-response.json';
import genericFailedResponse from './generic-failed-response.json';
import feasibilityAllowedMock from './feasibility-allowed.mock.json';
import feasibilityDeclinedMock from './feasibility-declined.mock.json';

const baseUrl = 'http://testhost/v1/shopping/order';

export const submitOrderMock = rest.post(
  `${baseUrl}/cart/:cartId`,
  async ({ params: { cartId } }, res, ctx) => {
    if (cartId === 'abc') {
      /* Simulate error responses */
      return res(ctx.status(500), ctx.json(genericFailedResponse));
    }
    return res(ctx.status(200), ctx.json(submitOrderSuccessResponseMock));
  },
);

export const getChangePlanFeasibilityHandler = rest.get(
  `${baseUrl}/feasibility/plans/lines/:lineNumber`,
  (req, res, ctx) => {
    const { lineNumber } = req.params;
    if (lineNumber === '0211615249') {
      return res(ctx.json(feasibilityAllowedMock));
    }
    return res(ctx.json(feasibilityDeclinedMock));
  },
);

export const getChangeExtraFeasibilityHandler = rest.get(
  `${baseUrl}/feasibility/extras/lines/:lineNumber`,
  (req, res, ctx) => {
    const { lineNumber } = req.params;
    if (lineNumber === '0276398120' || lineNumber === '0276404520') {
      return res(ctx.json(feasibilityAllowedMock));
    }
    return res(ctx.json(feasibilityDeclinedMock));
  },
);

const handlers = [
  getChangeExtraFeasibilityHandler,
  getChangePlanFeasibilityHandler,
  submitOrderMock,
];

export default handlers;
