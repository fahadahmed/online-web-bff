import { rest } from 'msw';

import usageHistoryDataHourlyMock from './usage-history-data-hourly.mock.json';
import usageHistoryDataDailyMock from './usage-history-data-daily.mock.json';
import usageHistoryDataMonthlyMock from './usage-history-data-monthly.mock.json';

import usageHistorySMSMonthlyMock from './usage-history-sms-monthly.mock.json';
import usageHistoryVoiceMonthlyMock from './usage-history-voice-monthly.mock.json';

import usageHistoryDetailsDataPlanMock from './usage-details-data-plan.mock.json';
import usageHistoryDetailsSMSAdditionalIncludedMock from './usage-details-sms-additional-included.mock.json';
import usageHistoryDetailsVoiceAdditionalPaidMock from './usage-details-voice-additional-paid.mock.json';

const responseDelay = process.env.NODE_ENV === 'test' ? 0 : 1000;

const handlers = [
  rest.get(
    'http://testhost/v2/line/:lineNumber/usage/:usageType/:interval',
    async (req, res, ctx) => {
      const { usageType, interval } = req.params;

      if (usageType === 'data') {
        if (interval === 'hourly') {
          return res(
            ctx.delay(responseDelay),
            ctx.json(usageHistoryDataHourlyMock),
          );
        }

        if (interval === 'daily') {
          return res(
            ctx.delay(responseDelay),
            ctx.json(usageHistoryDataDailyMock),
          );
        }

        return res(
          ctx.delay(responseDelay),
          ctx.json(usageHistoryDataMonthlyMock),
        );
      }

      if (usageType === 'sms') {
        return res(
          ctx.delay(responseDelay),
          ctx.json(usageHistorySMSMonthlyMock),
        );
      }

      return res(
        ctx.delay(responseDelay),
        ctx.json(usageHistoryVoiceMonthlyMock),
      );
    },
  ),

  rest.get(
    'http://testhost/v2/line/:lineNumber/usage/:usageType/:interval/:breakdownId',
    async (req, res, ctx) => {
      const { usageType } = req.params;

      if (usageType === 'data') {
        return res(
          ctx.delay(responseDelay),
          ctx.json(usageHistoryDetailsDataPlanMock),
        );
      }
      if (usageType === 'sms') {
        return res(
          ctx.delay(responseDelay),
          ctx.json(usageHistoryDetailsSMSAdditionalIncludedMock),
        );
      }

      return res(
        ctx.delay(responseDelay),
        ctx.json(usageHistoryDetailsVoiceAdditionalPaidMock),
      );
    },
  ),
];

export default handlers;
