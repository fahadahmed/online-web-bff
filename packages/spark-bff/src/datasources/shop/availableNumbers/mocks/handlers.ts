import { rest } from 'msw';
import availableNumbersMockSetOne from './availableNumbersSetOne.mock.json';
import availableNumbersMockSetTwo from './availableNumbersSetTwo.mock.json';

const baseUrl = 'http://testhost/v1/shop';

export const getAvailableNumbersMock = rest.get(
  `${baseUrl}/numbers/mobile`,
  async (req, res, ctx) => {
    const reservationId = req.url.searchParams.get('reservationId');

    if (reservationId === 'RE_20210603_008346474') {
      return res(ctx.status(200), ctx.json(availableNumbersMockSetOne));
    }
    return res(ctx.status(200), ctx.json(availableNumbersMockSetTwo));
  },
);

const handlers = [getAvailableNumbersMock];

export default handlers;
