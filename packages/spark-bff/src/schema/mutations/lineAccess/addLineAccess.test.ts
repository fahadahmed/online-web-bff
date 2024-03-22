import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import handlers from 'datasources/user/access/mocks/handlers';

beforeEach(() => {
  server.use(...handlers);
});

test('add line access successfully', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        addLineAccess(
          input: {
            lineNumber: "0271234567"
            balanceManagement: PREPAID
            authorisationCode: "1234"
          }
        ) {
          success
          message
          code
          nextStep
          title
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.addLineAccess).toMatchInlineSnapshot(`
    Object {
      "code": 2008,
      "message": "",
      "nextStep": null,
      "success": true,
      "title": "Your Prepaid mobile has been added.",
    }
  `);
});

test('add line access without authorisation code', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        addLineAccess(
          input: { lineNumber: "0271234567", balanceManagement: PREPAID }
        ) {
          success
          message
          code
          nextStep
          title
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.addLineAccess).toMatchInlineSnapshot(`
    Object {
      "code": 3004,
      "message": "The security code has been sent via SMS.",
      "nextStep": "AuthorisationCodeEntry",
      "success": false,
      "title": null,
    }
  `);
});
