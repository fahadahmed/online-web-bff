import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import handlers from 'datasources/utility/resource/mocks/handlers';

beforeEach(() => {
  server.use(...handlers);
});

test('a valid resourceId is a valid mobile number', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        mobileType(lineNumber: "0271234567") {
          isValidMobile
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();
  expect(res.data!.mobileType).toMatchInlineSnapshot(`
    Object {
      "isValidMobile": true,
    }
  `);
});

test('an invalid resourceId is a valid mobile number', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        mobileType(lineNumber: "abcdefghijkl") {
          isValidMobile
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();
  expect(res.data!.mobileType).toMatchInlineSnapshot(`
    Object {
      "isValidMobile": false,
    }
  `);
});

test('returns error on http status code 500', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        mobileType(lineNumber: "internalServerError") {
          isValidMobile
        }
      }
    `,
  });
  expect(res.errors).toBeDefined();
  expect(res.errors).toMatchInlineSnapshot(`
    Array [
      [GraphQLError: 500: Internal Server Error],
    ]
  `);
});
