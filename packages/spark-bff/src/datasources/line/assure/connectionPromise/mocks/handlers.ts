import { rest } from 'msw';
import connectionPromiseLines from './connectionPromiseLines.mock.json';
import addConnectionPromiseLineSuccess from './add-connectionPromiseLine-success.mock.json';
import addConnectionPromiseLineFailure from './add-connectionPromiseLine-failure.mock.json';
import updateConnectionPromiseLineSuccess from './update-connectionPromiseLine-success.mock.json';
import updateConnectionPromiseLineFailure from './update-connectionPromiseLine-failure.mock.json';
import deleteConnectionPromiseLineFailure from './delete-connectionPromiseLine-failure.mock.json';

const baseUrl = 'http://testhost/v1/line/';

export const getConnectionPromiseMock = rest.get(
  `${baseUrl}:lineNumber/assure/promise`,
  async ({ params: { lineNumber } }, res, ctx) => {
    if (lineNumber === '123456') {
      return res(ctx.status(400), ctx.json({}));
    }
    return res(ctx.status(200), ctx.json(connectionPromiseLines));
  },
);

export const addConnectionPromiseMock = rest.post(
  `${baseUrl}:lineNumber/assure/promise`,
  async ({ params: { lineNumber } }, res, ctx) => {
    if (lineNumber === '123456') {
      return res(ctx.status(403), ctx.json(addConnectionPromiseLineFailure));
    }
    return res(ctx.status(200), ctx.json(addConnectionPromiseLineSuccess));
  },
);

export const updateConnectionPromiseMock = rest.patch(
  `${baseUrl}:lineNumber/assure/promise/:connectionPromiseId`,
  async ({ params: { lineNumber } }, res, ctx) => {
    if (lineNumber === '123456') {
      return res(ctx.status(409), ctx.json(updateConnectionPromiseLineFailure));
    }
    return res(ctx.status(200), ctx.json(updateConnectionPromiseLineSuccess));
  },
);

export const deleteConnectionPromiseMock = rest.delete(
  `${baseUrl}:lineNumber/assure/promise/:connectionPromiseId`,
  async ({ params: { lineNumber } }, res, ctx) => {
    if (lineNumber === '123456') {
      return res(ctx.status(409), ctx.json(deleteConnectionPromiseLineFailure));
    }
    return res(ctx.status(200), ctx.json({}));
  },
);
const handlers = [
  getConnectionPromiseMock,
  addConnectionPromiseMock,
  updateConnectionPromiseMock,
  deleteConnectionPromiseMock,
];

export default handlers;
