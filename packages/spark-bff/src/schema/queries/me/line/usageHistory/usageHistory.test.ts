import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import usageHistoryMocks from 'datasources/line/usage/usageHistoryService/mocks';
import { NexusGenEnums } from 'generated/nexusTypes';

beforeEach(() => {
  server.use(...usageHistoryMocks);
});

function constructUsageHistoryQuery(
  usageType: NexusGenEnums['LineUsageHistoryUsageType'],
  interval: NexusGenEnums['LineHistoryInterval'],
) {
  return {
    query: gql`
      query UsageHistoryQuery(
        $usageType: LineUsageHistoryUsageType!
        $interval: LineHistoryInterval!
      ) {
        me {
          line(lineNumber: "033227715") {
            usageHistory(usageType: $usageType, interval: $interval) {
              accountType
              sharerType
              interval
              startDateTime
              endDateTime
              averagePeriodUsage {
                unit
                value
              }
              averageGroupPeriodUsage {
                unit
                value
              }
              summarisedPeriods {
                startDateTime
                endDateTime
                unbilled
                periodUsage {
                  unit
                  value
                }
                periodGroupUsage {
                  unit
                  value
                }
                periodBreakdown {
                  breakdownType
                  periodBreakdownId
                  periodUsage {
                    value
                    unit
                  }
                  periodGroupUsage {
                    unit
                    value
                  }
                  periodLimit {
                    value
                    unit
                  }
                  periodGroupLimit {
                    unit
                    value
                  }
                  periodRemaining {
                    value
                    unit
                  }
                  periodGroupRemaining {
                    unit
                    value
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      usageType,
      interval,
    },
  };
}

test('hourly data usage', async () => {
  const { query } = createTestClient();
  const res = await query(constructUsageHistoryQuery('DATA', 'HOURLY'));

  expect(res.errors).toBeUndefined();
  expect(res.data!.me.line).toMatchSnapshot();
});

test('daily data usage', async () => {
  const { query } = createTestClient();
  const res = await query(constructUsageHistoryQuery('DATA', 'DAILY'));

  expect(res.errors).toBeUndefined();
  expect(res.data!.me.line).toMatchSnapshot();
});

test('monthly data usage', async () => {
  const { query } = createTestClient();
  const res = await query(constructUsageHistoryQuery('DATA', 'MONTHLY'));

  expect(res.errors).toBeUndefined();
  expect(res.data!.me.line).toMatchSnapshot();
});

test('monthly sms usage', async () => {
  const { query } = createTestClient();
  const res = await query(constructUsageHistoryQuery('SMS', 'MONTHLY'));

  expect(res.errors).toBeUndefined();
  expect(res.data!.me.line).toMatchSnapshot();
});

test('monthly voice usage', async () => {
  const { query } = createTestClient();
  const res = await query(constructUsageHistoryQuery('VOICE', 'MONTHLY'));

  expect(res.errors).toBeUndefined();
  expect(res.data!.me.line).toMatchSnapshot();
});
