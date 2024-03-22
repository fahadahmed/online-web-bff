import { rest } from 'msw';
import getMobileTypeSuccess from './get-mobile-type-success.mock.json';
import getResourceTypePostpaidResponse from './get-resource-type-postpaid-line.mock.json';
import getResourceTypePrepaidLineResponse from './get-resource-type-prepaid-line.mock.json';
import getResourceTypeBroadbandLineResponse from './get-resource-type-broadband-line.mock.json';

const baseUrl = 'http://testhost/v1/utility/resource';

export const getMobileTypeMock = rest.get<unknown, { resourceId: string }>(
  `${baseUrl}/:resourceId/mobiletype`,
  async ({ params: { resourceId } }, res, ctx) => {
    if (resourceId === 'internalServerError') {
      return res(ctx.status(500), ctx.json({}));
    }
    if (resourceId.match(/^\d+$/) !== null) {
      return res(ctx.status(200), ctx.json(getMobileTypeSuccess));
    }
    return res(ctx.status(400), ctx.json({}));
  },
);

const getResourceTypeMock = rest.get(
  `${baseUrl}/:resourceId`,
  async ({ params: { resourceId } }, res, ctx) => {
    switch (resourceId) {
      case '0278149915':
        return res(
          ctx.status(200),
          ctx.json(getResourceTypePrepaidLineResponse),
        );
      case '033478552':
        return res(
          ctx.status(200),
          ctx.json(getResourceTypeBroadbandLineResponse),
        );
      default:
        return res(ctx.status(200), ctx.json(getResourceTypePostpaidResponse));
    }
  },
);

const handlers = [getMobileTypeMock, getResourceTypeMock];

export default handlers;
