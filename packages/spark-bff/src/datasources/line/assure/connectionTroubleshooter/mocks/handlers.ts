import { rest } from 'msw';
import connectionTroubleshooter from './connection-troubleshooter.mock.json';

const baseUrl = 'http://testhost/v1/line/';

export const connectionTroubleshooterMock = rest.get(
  `${baseUrl}:lineNumber/assure/troubleshoot/:diagnosticCode`,
  async (_, res, ctx) => {
    return res(ctx.json(connectionTroubleshooter));
  },
);

const handlers = [connectionTroubleshooterMock];

export default handlers;
