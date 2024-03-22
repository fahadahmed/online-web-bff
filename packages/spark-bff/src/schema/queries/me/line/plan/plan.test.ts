import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { getLinePlanHandler } from 'datasources/line/lineDetails/mocks/handlers';
import accessHandlers from 'datasources/user/access/mocks/handlers';

beforeEach(() => {
  server.use(getLinePlanHandler, ...accessHandlers);
});

test('successfully fetchs plan information for a line', async () => {
  const linePlanQuery = gql`
    query {
      me {
        line(lineNumber: "033227715") {
          plan {
            balanceManagement
            customerSegment
            legalCategory
            lineOfBusiness
            price
            productId
            productName
            planType
          }
        }
      }
    }
  `;
  const { query } = createTestClient();
  const res = await query({
    query: linePlanQuery,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.me).toMatchInlineSnapshot(`
    Object {
      "line": Object {
        "plan": Object {
          "balanceManagement": "PREPAID",
          "customerSegment": "Consumer",
          "legalCategory": "Individual",
          "lineOfBusiness": "Spark",
          "planType": "MOBILE_POSTPAID_NOTERM",
          "price": 39.99,
          "productId": "ServicePlan3067",
          "productName": "Mobile $39.99 Rollover Plan",
        },
      },
    }
  `);
});
