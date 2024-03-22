import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { accountSummaryHandler } from 'datasources/customer/accountsService/mocks/handlers';

beforeEach(() => {
  server.use(accountSummaryHandler);
});

test('successfully retrieves the account summary for a valid account number', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        accountSummary(accountNumber: "1234567") {
          firstName
          lastName
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data.accountSummary).toMatchSnapshot();
});

test('404 response for account summary with a invalid account number', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        accountSummary(accountNumber: "d789172381") {
          firstName
          lastName
        }
      }
    `,
  });

  expect(res.errors).toBeDefined();
  expect(res.errors).toMatchInlineSnapshot(`
    Array [
      [GraphQLError: 400: Bad Request],
    ]
  `);
});
