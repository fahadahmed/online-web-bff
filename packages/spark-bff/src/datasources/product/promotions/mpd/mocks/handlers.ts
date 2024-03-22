import { rest } from 'msw';
import productPromotionsMPDMockResponse from './productPromotionsMPD.mock.json';

const baseUrl = 'http://testhost/v1/products';

export const getProductPromotionsMPDMock = rest.post(
  `${baseUrl}/promotions/mpd/search`,
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(productPromotionsMPDMockResponse));
  },
);

const handlers = [getProductPromotionsMPDMock];

export default handlers;
