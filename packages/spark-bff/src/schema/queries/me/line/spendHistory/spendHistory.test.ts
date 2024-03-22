import { server } from 'test/server';
import spendHistoryMocks from 'datasources/line/spend/mocks/handlers';
import { createTestClient, gql } from 'test/apolloTestUtils';

beforeEach(() => {
  server.use(...spendHistoryMocks);
});

test('returns usage charge history for a line ', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          line(lineNumber: "0277489070") {
            spendHistory(
              interval: MONTHLY
              start: "2020-03-01T00:00:00.000+13:00"
              end: "2020-03-01T00:00:00.000+13:00"
            ) {
              interval
              accountType
              gstInclusive
              startDateTime
              endDateTime
              averagePeriodSpend
              summarisedPeriods {
                startDateTime
                endDateTime
                periodSpend
                unbilled
                periodBreakdown {
                  breakdownType
                  periodBreakdownId
                  periodSpend
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

test('returns usage charge history detail for a line ', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          line(lineNumber: "0277489070") {
            spendHistoryDetail(
              interval: MONTHLY
              periodBreakdownId: "fgNaGUKJHUWCj5WhoE1lZw"
            ) {
              interval
              breakdownType
              gstInclusive
              startDateTime
              endDateTime
              periodSpend
              unbilled
              contributingProducts {
                offerId
                productName
                chargeStartDateTime
                chargeEndDateTime
                productEndDateTime
                periodSpend
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
