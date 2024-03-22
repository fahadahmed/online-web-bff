import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { getLineDetailsHandler } from 'datasources/line/lineDetails/mocks/handlers';

beforeEach(() => {
  server.use(getLineDetailsHandler);
});

test('returns auto topup details for the input line number', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        lineDetails(lineNumber: "033227715") {
          autoTopupDetails {
            topupSettings {
              topupAmount
              cardDetails {
                lastFourDigits
              }
              monthlyTopupLimit
              nextPaymentDate
              thresholdAmount
            }
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.lineDetails).toMatchInlineSnapshot(`
    Object {
      "autoTopupDetails": Object {
        "topupSettings": Array [
          Object {
            "cardDetails": Object {
              "lastFourDigits": "6543",
            },
            "monthlyTopupLimit": null,
            "nextPaymentDate": "2021-02-07T08:34:14Z",
            "thresholdAmount": null,
            "topupAmount": 25,
          },
        ],
      },
    }
  `);
});
