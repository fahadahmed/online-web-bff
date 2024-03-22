import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import accessHandlers from 'datasources/user/access/mocks/handlers';

beforeEach(() => {
  server.use(...accessHandlers);
});

test('returns active accounts when status is Active', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          line(lineNumber: "033227715") {
            displayName
            lineNumber
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.me).toMatchInlineSnapshot(`
    Object {
      "line": Object {
        "displayName": null,
        "lineNumber": "033227715",
      },
    }
  `);
});
