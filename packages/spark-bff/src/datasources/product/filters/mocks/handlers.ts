import { rest } from 'msw';
import productFiltersMockResponse from './productFilters.mock.json';

const baseUrl = 'http://testhost/v1/products';

export const getProductFiltersMock = rest.get(
  `${baseUrl}/category/:categoryId/filters`,
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(productFiltersMockResponse));
  },
);

const handlers = [getProductFiltersMock];

export default handlers;
