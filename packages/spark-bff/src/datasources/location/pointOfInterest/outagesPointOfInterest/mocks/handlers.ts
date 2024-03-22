import { rest } from 'msw';
import { operations } from 'generated/typings/pointsOfInterestService';
import landlineMaintenance from './outages_LandlineMaintenance.mock.json';
import landlineOutages from './outages_LandLineOutages.mock.json';
import internet from './outages_Internet.mock.json';
import landline from './outages_Landline.mock.json';
import mobile from './outages_Mobile.mock.json';
import other from './outages_Other.mock.json';

const responseDelay = process.env.NODE_ENV === 'test' ? 0 : 700;
type OutageType =
  operations['fetchOutageData']['parameters']['query']['outageType'];
type ServiceAffected =
  operations['fetchOutageData']['parameters']['query']['serviceAffected'];

const handlers = [
  rest.get(
    'http://testhost/v1/location/pointsofinterest/outages',
    async (req, res, ctx) => {
      const outageType = req.url.searchParams.get('outageType') as OutageType;
      const serviceAffected = req.url.searchParams.get(
        'serviceAffected',
      ) as ServiceAffected;

      if (serviceAffected === 'INTERNET') {
        return res(ctx.delay(responseDelay), ctx.json(internet));
      }

      if (serviceAffected === 'LANDLINE') {
        if (outageType === 'MAINTENANCE') {
          return res(ctx.delay(responseDelay), ctx.json(landlineMaintenance));
        }
        if (outageType === 'OUTAGE') {
          return res(ctx.delay(responseDelay), ctx.json(landlineOutages));
        }
        return res(ctx.delay(responseDelay), ctx.json(landline));
      }

      if (serviceAffected === 'MOBILE') {
        return res(ctx.delay(responseDelay), ctx.json(mobile));
      }

      if (serviceAffected === 'OTHERS') {
        return res(ctx.delay(responseDelay), ctx.json(other));
      }

      return res(ctx.status(404));
    },
  ),
];

export default handlers;
