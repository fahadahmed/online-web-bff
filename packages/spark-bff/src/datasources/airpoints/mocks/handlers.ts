import { rest } from 'msw';
import airpointsResponseMock from './airpoints-response.mock.json';
import addAirpointsResponseMock from './add-airpoints-response.mock.json';
import deleteAirpointsResponseMock from './delete-airpoints-response.mock.json';
import airpointsInactiveResponseMock from './airpoints-inactive-response.mock.json';
import addAirpointsErrorResponseMock from './add-airpoints-error-response.mock.json';
import deleteAirpointsErrorResponseMock from './delete-airpoints-error-response.mock.json';

interface AddAirpointsMockBody {
  accountNumber?: string;
  airpointsNumber?: string;
  firstName?: string;
  lastName?: string;
  status?: string;
}

export const airpointsResponseMocks = rest.get<AddAirpointsMockBody>(
  `http://testhost/v1/services/airpoints/:accountNumber`,
  async ({ params: { accountNumber } }, res, ctx) => {
    if (accountNumber === '123456789') {
      /* Simulate error responses */
      return res(ctx.status(200), ctx.json(airpointsResponseMock));
    }
    return res(ctx.status(200), ctx.json(airpointsInactiveResponseMock));
  },
);

export const updateAirpointsResponseMocks = rest.post<AddAirpointsMockBody>(
  `http://testhost/v1/services/airpoints/:accountNumber`,
  async (
    { params: { accountNumber }, body: { airpointsNumber } },
    res,
    ctx,
  ) => {
    /* add airpoints */
    if (airpointsNumber) {
      if (airpointsNumber === '911') {
        /* Simulate error responses */
        return res(ctx.status(400), ctx.json(addAirpointsErrorResponseMock));
      }
      return res(ctx.status(200), ctx.json(addAirpointsResponseMock));
    }
    /* delete airpoints */
    if (accountNumber) {
      if (accountNumber === '911') {
        /* Simulate error responses */
        return res(ctx.status(200), ctx.json(deleteAirpointsErrorResponseMock));
      }
      return res(ctx.status(200), ctx.json(deleteAirpointsResponseMock));
    }
    return null;
  },
);

const handlers = [airpointsResponseMocks, updateAirpointsResponseMocks];

export default handlers;
