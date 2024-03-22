import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { getChangeExtraFeasibilityHandler } from 'datasources/shop/order/mocks/handlers';

beforeEach(() => {
  server.use(getChangeExtraFeasibilityHandler);
});

test('change extra order is feasible', async () => {
  const feasibilityPlanQuery = gql`
    query {
      me {
        line(lineNumber: "0276398120") {
          changeExtraFeasibility {
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
        "changeExtraFeasibility": Object {
          "feasibilityReason": "ALLOWED",
          "orderFeasible": true,
        },
      },
    }
  `);
});

test('change extra order is not feasible', async () => {
  const feasibilityPlanQuery = gql`
    query {
      me {
        line(lineNumber: "0211615249") {
          changeExtraFeasibility {
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
        "changeExtraFeasibility": Object {
          "feasibilityReason": "IN_PROGRESS",
          "orderFeasible": false,
        },
      },
    }
  `);
});
