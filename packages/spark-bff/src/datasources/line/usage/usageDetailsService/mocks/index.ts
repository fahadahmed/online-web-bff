import { rest } from 'msw';
import usageDetailsMock from './usage-details.mock.json';
import unlimitedPlanUsageMock from './unlimted-plans.mock.json';

const responseDelay = process.env.NODE_ENV === 'test' ? 0 : 700;

/**
 * For Roaming packs use usageDetailsRoamingPacksMock
 * For Roaming data pack use usageDetailsMock
 */
const handlers = [
  rest.get(
    'http://testhost/v1/line/usage/me/:lineNumber',
    async (req, res, ctx) => {
      const { lineNumber } = req.params;

      if (lineNumber === '033227715') {
        return res(ctx.delay(responseDelay), ctx.json(usageDetailsMock));
      }
      if (
        lineNumber === '033227716' ||
        lineNumber === '033227717' ||
        lineNumber === '0272651690' ||
        lineNumber === '0273215879' ||
        lineNumber === '0276404520' ||
        lineNumber === '0211615249'
      ) {
        return res(ctx.delay(responseDelay), ctx.json(unlimitedPlanUsageMock));
      }

      return res(ctx.delay(responseDelay), null);
    },
  ),
];

export default handlers;
