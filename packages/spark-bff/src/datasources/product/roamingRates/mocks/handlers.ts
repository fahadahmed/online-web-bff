import { rest } from 'msw';

import roamingRatesMockResponse from './roamingRates.mock.json';

const baseUrl = 'http://testhost/v1/products';

export const roamingRatesHandler = rest.get(
  `${baseUrl}/rates/roaming`,
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(roamingRatesMockResponse));
  },
);

const handlers = [roamingRatesHandler];

export default handlers;
