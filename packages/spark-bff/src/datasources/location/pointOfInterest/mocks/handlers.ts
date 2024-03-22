import { rest } from 'msw';
import { operations } from 'generated/typings/pointsOfInterestService';
import stores from './pointsOfInterestServices_STORES.mock.json';
import storesByLocation from './pointsOfInterestServices_STORES_location.mock.json';

import wifi from './pointsofInterestService_WIFI.mock.json';
import business from './pointsOfInterestService_BUSINESS.mock.json';

const responseDelay = process.env.NODE_ENV === 'test' ? 0 : 700;
type ServiceType =
  operations['fetchServicesData']['parameters']['query']['serviceType'];

const handlers = [
  rest.get(
    'http://testhost/v1/location/pointsofinterest/services',
    async (req, res, ctx) => {
      const serviceType = req.url.searchParams.get(
        'serviceType',
      ) as ServiceType;
      const location = req.url.searchParams.get('location') as string;

      if (serviceType === 'STORE') {
        if (location) {
          return res(ctx.delay(responseDelay), ctx.json(storesByLocation));
        }
        return res(ctx.delay(responseDelay), ctx.json(stores));
      }
      if (serviceType === 'BUSINESS') {
        return res(ctx.delay(responseDelay), ctx.json(business));
      }

      if (serviceType === 'WIFI') {
        return res(ctx.delay(responseDelay), ctx.json(wifi));
      }

      return res(ctx.status(404));
    },
  ),
];

export default handlers;
