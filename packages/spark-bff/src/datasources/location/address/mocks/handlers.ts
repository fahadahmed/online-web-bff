import { rest } from 'msw';

import addressSuggestions from './address-suggestions.mock.json';
import addressDetails from './address-details.mock.json';

const responseDelay = process.env.NODE_ENV === 'test' ? 0 : 700;

const handlers = [
  rest.get(
    'http://testhost/v1/location/address/results/search',
    async (_, res, ctx) => {
      return res(ctx.delay(responseDelay), ctx.json(addressSuggestions));
    },
  ),

  rest.get(
    'http://testhost/v1/location/address/details/:elid',
    async (_, res, ctx) => {
      return res(ctx.delay(responseDelay), ctx.json(addressDetails));
    },
  ),
];

export default handlers;
