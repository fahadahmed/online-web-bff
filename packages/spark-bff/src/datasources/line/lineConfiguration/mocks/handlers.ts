import { rest } from 'msw';
import lineCongigurationGroupCaps from './line-configuration-group-caps.mock.json';
import smartCapSuccess from './smart-cap-success.mock.json';
import smartCapFailure from './smart-cap-failure.mock.json';

const responseDelay = process.env.NODE_ENV === 'test' ? 0 : 700;

const baseUrl = 'http://testhost/v1/line/configuration/';

export const getGroupCapsMock = rest.get(
  `${baseUrl}:lineNumber/groupcaps`,
  async (_, res, ctx) => {
    return res(ctx.delay(responseDelay), ctx.json(lineCongigurationGroupCaps));
  },
);

export const updateSmartCapMock = rest.put(
  `${baseUrl}:lineNumber/smartcap`,
  async ({ params: { lineNumber } }, res, ctx) => {
    if (lineNumber === 'InvalidRequest') {
      return res(ctx.status(400), ctx.json(smartCapFailure));
    }
    return res(ctx.status(200), ctx.json(smartCapSuccess));
  },
);
const handlers = [updateSmartCapMock, getGroupCapsMock];
export default handlers;
