import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { prepaidBalanceMock } from 'datasources/finance/prepaidBalanceService/mocks/handlers';

beforeEach(() => {
  server.use(prepaidBalanceMock);
});

test('successfully retrieves the prepaid balance details for a linenumber. ', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          prepaidBalance(lineNumber: "0272547109") {
            lineNumber
            balance
            balanceExpiryDate
            retrievalDate
            lastTopUpAmount
            lastTopUpDate
            summaryMessage {
              primary
              secondary
              tertiary
              status
              primaryCta {
                label
                code
              }
              secondaryCta {
                label
                code
              }
              otherCtas {
                label
                code
              }
            }
            detailMessage {
              primary
              secondary
              tertiary
              status
              primaryCta {
                label
                code
              }
              secondaryCta {
                label
                code
              }
              otherCtas {
                label
                code
              }
            }
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.me.prepaidBalance).toMatchSnapshot();
});
