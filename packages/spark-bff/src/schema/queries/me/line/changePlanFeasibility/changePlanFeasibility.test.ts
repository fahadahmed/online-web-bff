import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { getChangePlanFeasibilityHandler } from 'datasources/shop/order/mocks/handlers';

beforeEach(() => {
  server.use(getChangePlanFeasibilityHandler);
});
test('change plan order is feasible', async () => {
  const feasibilityPlanQuery = gql`
    query {
      me {
        line(lineNumber: "0211615249") {
          changePlanFeasibility {
            orderFeasible
            feasibilityReason
          }
        }
      }
    }
  `;
  const { query } = createTestClient();
  const res = await query({
    query: feasibilityPlanQuery,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.me).toMatchInlineSnapshot(`
    Object {
      "line": Object {
        "changePlanFeasibility": Object {
          "feasibilityReason": "ALLOWED",
          "orderFeasible": true,
        },
      },
    }
  `);
});

test('change plan order is not feasible', async () => {
  const feasibilityPlanQuery = gql`
    query {
      me {
        line(lineNumber: "0276404520") {
          changePlanFeasibility {
            orderFeasible
            feasibilityReason
          }
        }
      }
    }
  `;
  const { query } = createTestClient();
  const res = await query({
    query: feasibilityPlanQuery,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.me).toMatchInlineSnapshot(`
    Object {
      "line": Object {
        "changePlanFeasibility": Object {
          "feasibilityReason": "IN_PROGRESS",
          "orderFeasible": false,
        },
      },
    }
  `);
});
