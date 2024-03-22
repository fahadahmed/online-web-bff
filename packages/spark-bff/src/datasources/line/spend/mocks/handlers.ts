import { rest } from 'msw';

import spendHistoryMock from './spend-history.mock.json';
import spendHistoryDetailAdditionalPaidMock from './spend-history-detail-additional-paid.mock.json';
import spendHistoryDetailPlanMock from './spend-history-detail-plan.mock.json';

const handlers = [
  rest.get(
    'http://testhost/v1/line/:lineNumber/spend/:interval',
    async (_, res, ctx) => {
      return res(ctx.json(spendHistoryMock));
    },
  ),
  rest.get(
    'http://testhost/v1/line/:lineNumber/spend/:interval/:periodBreakdownId',
    async ({ params: { periodBreakdownId } }, res, ctx) => {
      if (periodBreakdownId.includes('ADDITIONAL_PAID')) {
        return res(ctx.json(spendHistoryDetailAdditionalPaidMock));
      }
      return res(ctx.json(spendHistoryDetailPlanMock));
    },
  ),
];

export default handlers;
