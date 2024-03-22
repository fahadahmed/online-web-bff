import { rest } from 'msw';

import profileSuccessResponse from './profile-success-response.mock.json';

const handlers = [
  rest.get('http://testhost/v1/marketing/profile/me', async (_, res, ctx) => {
    return res(ctx.json(profileSuccessResponse));
  }),
];

export default handlers;
