import { rest } from 'msw';
import connectionDiagnosticsSuccess from './connection-diagnostics-success.mock.json';
import connectionDiagnosticsFailure from './connection-diagnostics-failure.mock.json';

const baseUrl = 'http://testhost/v1/line/';

export const runConnectionDiagnosticsMock = rest.post(
  `${baseUrl}:lineNumber/assure/diagnostics`,
  async ({ params: { lineNumber } }, res, ctx) => {
    if (lineNumber === '123456') {
      return res(ctx.status(400), ctx.json(connectionDiagnosticsFailure));
    }
    return res(ctx.status(200), ctx.json(connectionDiagnosticsSuccess));
  },
);

const handlers = [runConnectionDiagnosticsMock];
export default handlers;
