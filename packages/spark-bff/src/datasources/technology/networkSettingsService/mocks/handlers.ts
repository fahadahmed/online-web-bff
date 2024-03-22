import { rest } from 'msw';
import skinnyServiceProviderMock from './skinny-service-provider.mock.json';
import sparkServiceProviderMock from './spark-service-provider.mock.json';
import vodafoneServiceProviderMock from './vodafone-service-provider.mock.json';
import unknownServiceProviderMock from './unknown-service-provider.mock.json';

const baseUrl = 'http://testhost/v1/technology';

export const serviceProviderHandler = rest.get(
  `${baseUrl}/mobile/:lineNumber/provider`,
  async (req, res, ctx) => {
    const { lineNumber } = req.params;

    if (lineNumber === '021123456') {
      return res(ctx.status(200), ctx.json(vodafoneServiceProviderMock));
    }

    if (lineNumber === '021000000') {
      return res(ctx.status(200), ctx.json(sparkServiceProviderMock));
    }

    if (lineNumber === '027111111') {
      return res(ctx.status(200), ctx.json(skinnyServiceProviderMock));
    }

    return res(ctx.status(200), ctx.json(unknownServiceProviderMock));
  },
);

const handlers = [serviceProviderHandler];

export default handlers;
