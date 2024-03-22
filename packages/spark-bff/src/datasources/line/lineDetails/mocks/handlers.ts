import { rest } from 'msw';
import linePlanInformationMock from './line-plan.mock.json';
import linePlanExtrasInformationMock from './line-plan-extras.mock.json';
import lineDetailsMock from './line-details.mock.json';
import lineAllowancesMock from './line-allowances.mock.json';

const baseUrl = 'http://testhost/v1/line';

export const getLineDetailsHandler = rest.get(
  `${baseUrl}/:lineNumber/details`,
  (_, res, ctx) => {
    return res(ctx.json(lineDetailsMock));
  },
);

export const getLinePlanHandler = rest.get(
  `${baseUrl}/:lineNumber/plan`,
  async (req, res, ctx) => {
    const { lineNumber } = req.params;
    return res(
      ctx.json(
        lineNumber === '0276398120'
          ? linePlanExtrasInformationMock
          : linePlanInformationMock,
      ),
    );
  },
);

export const getLineAllowancesHandler = rest.get(
  `${baseUrl}/:lineNumber/allowances`,
  async (_, res, ctx) => {
    return res(ctx.json(lineAllowancesMock));
  },
);

const handlers = [
  getLineDetailsHandler,
  getLinePlanHandler,
  getLineAllowancesHandler,
];

export default handlers;
