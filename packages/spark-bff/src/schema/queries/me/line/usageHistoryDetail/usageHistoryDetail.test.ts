import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import usageHistoryMocks from 'datasources/line/usage/usageHistoryService/mocks';

beforeEach(() => {
  server.use(...usageHistoryMocks);
});

test('plan data usage history detail', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          line(lineNumber: "033227715") {
            usageHistoryDetail(
              usageType: DATA
              interval: MONTHLY
              periodBreakdownId: "7777777"
            ) {
              interval
              breakdownType
              startDateTime
              endDateTime
              unbilled
              periodUsage {
                value
                unit
              }
              periodGroupUsage {
                unit
                value
              }
              contributingProducts {
                offerId
                productName
                acquisitionDate
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
    `,
  });
  expect(res.errors).toBeUndefined();
  expect(res.data!.me.line).toMatchSnapshot();
});

test('additional paid voice usage history detail', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          line(lineNumber: "033227715") {
            usageHistoryDetail(
              usageType: VOICE
              interval: MONTHLY
              periodBreakdownId: "aaaaa"
            ) {
              interval
              breakdownType
              startDateTime
              endDateTime
              periodUsage {
                value
                unit
              }
              periodGroupUsage {
                unit
                value
              }
              contributingProducts {
                offerId
                productName
                acquisitionDate
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
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.me.line).toMatchSnapshot();
});

test('additional included sms usage history detail', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          line(lineNumber: "033227715") {
            usageHistoryDetail(
              usageType: SMS
              interval: MONTHLY
              periodBreakdownId: "1234567"
            ) {
              interval
              breakdownType
              startDateTime
              endDateTime
              periodUsage {
                value
                unit
              }
              contributingProducts {
                offerId
                productName
                acquisitionDate
                periodUsage {
                  value
                  unit
                }
                periodLimit {
                  value
                  unit
                }
                periodRemaining {
                  value
                  unit
                }
              }
            }
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.me.line).toMatchSnapshot();
});
