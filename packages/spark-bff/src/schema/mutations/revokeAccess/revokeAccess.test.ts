import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import handlers from 'datasources/user/access/mocks/handlers';

beforeEach(() => {
  server.use(...handlers);
});

test('revoke account and line successfully', async () => {
  const { mutate } = createTestClient();
  const revokeAccountRes = await mutate({
    mutation: gql`
      mutation {
        revokeAccess(
          input: { entityID: "12345678", type: Account, number: "12345678" }
        ) {
          success
          message
          code
        }
      }
    `,
  });
  expect(revokeAccountRes.errors).toBeUndefined();
  expect(revokeAccountRes.data).toMatchInlineSnapshot(`
    Object {
      "revokeAccess": Object {
        "code": 2008,
        "message": "Request successfully processed",
        "success": true,
      },
    }
  `);

  const revokeLineRes = await mutate({
    mutation: gql`
      mutation {
        revokeAccess(
          input: { entityID: "12345678", type: Line, number: "12345678" }
        ) {
          success
          message
          code
        }
      }
    `,
  });
  expect(revokeLineRes.errors).toBeUndefined();
  expect(revokeLineRes.data).toMatchInlineSnapshot(`
    Object {
      "revokeAccess": Object {
        "code": 2008,
        "message": "Request successfully processed",
        "success": true,
      },
    }
  `);
});

test('revoke account and line failed with 4065 code', async () => {
  const { mutate } = createTestClient();
  const revokeAccountRes = await mutate({
    mutation: gql`
      mutation {
        revokeAccess(
          input: { entityID: "12345678", type: Account, number: "4065" }
        ) {
          success
          message
          code
        }
      }
    `,
  });
  expect(revokeAccountRes.errors).toBeUndefined();
  expect(revokeAccountRes.data).toMatchInlineSnapshot(`
    Object {
      "revokeAccess": Object {
        "code": 4065,
        "message": "The user isn't a myspark id.  This should never happen",
        "success": false,
      },
    }
  `);

  const revokeLineRes = await mutate({
    mutation: gql`
      mutation {
        revokeAccess(
          input: { entityID: "12345678", type: Line, number: "4065" }
        ) {
          success
          message
          code
        }
      }
    `,
  });
  expect(revokeLineRes.errors).toBeUndefined();
  expect(revokeLineRes.data).toMatchInlineSnapshot(`
    Object {
      "revokeAccess": Object {
        "code": 4065,
        "message": "The user isn't a myspark id.  This should never happen",
        "success": false,
      },
    }
  `);
});

test('revoke account and line failed with 4183 code', async () => {
  const { mutate } = createTestClient();
  const revokeAccountRes = await mutate({
    mutation: gql`
      mutation {
        revokeAccess(
          input: { entityID: "12345678", type: Account, number: "4183" }
        ) {
          success
          message
          code
        }
      }
    `,
  });
  expect(revokeAccountRes.errors).toBeUndefined();
  expect(revokeAccountRes.data).toMatchInlineSnapshot(`
    Object {
      "revokeAccess": Object {
        "code": 4183,
        "message": "The user doesn't have sufficient permission to remove access to the account (because it's not the owner, etc)",
        "success": false,
      },
    }
  `);

  const revokeLineRes = await mutate({
    mutation: gql`
      mutation {
        revokeAccess(
          input: { entityID: "12345678", type: Line, number: "4183" }
        ) {
          success
          message
          code
        }
      }
    `,
  });
  expect(revokeLineRes.errors).toBeUndefined();
  expect(revokeLineRes.data).toMatchInlineSnapshot(`
    Object {
      "revokeAccess": Object {
        "code": 4183,
        "message": "The user doesn't have sufficient permission to remove access to the account (because it's not the owner, etc)",
        "success": false,
      },
    }
  `);
});

test('revoke account and line failed with 4002 code', async () => {
  const { mutate } = createTestClient();
  const revokeAccountRes = await mutate({
    mutation: gql`
      mutation {
        revokeAccess(
          input: { entityID: "12345678", type: Account, number: "4002" }
        ) {
          success
          message
          code
        }
      }
    `,
  });
  expect(revokeAccountRes.errors).toBeUndefined();
  expect(revokeAccountRes.data).toMatchInlineSnapshot(`
    Object {
      "revokeAccess": Object {
        "code": 4002,
        "message": "Various validation errors",
        "success": false,
      },
    }
  `);

  const revokeLineRes = await mutate({
    mutation: gql`
      mutation {
        revokeAccess(
          input: { entityID: "12345678", type: Line, number: "4002" }
        ) {
          success
          message
          code
        }
      }
    `,
  });
  expect(revokeLineRes.errors).toBeUndefined();
  expect(revokeLineRes.data).toMatchInlineSnapshot(`
    Object {
      "revokeAccess": Object {
        "code": 4002,
        "message": "Various validation errors",
        "success": false,
      },
    }
  `);
});

test('revoke account and line failed with 4007 code', async () => {
  const { mutate } = createTestClient();
  const revokeAccountRes = await mutate({
    mutation: gql`
      mutation {
        revokeAccess(
          input: { entityID: "12345678", type: Account, number: "4007" }
        ) {
          success
          message
          code
        }
      }
    `,
  });
  expect(revokeAccountRes.errors).toBeUndefined();
  expect(revokeAccountRes.data).toMatchInlineSnapshot(`
    Object {
      "revokeAccess": Object {
        "code": 4007,
        "message": "The user appears to be not logged in.",
        "success": false,
      },
    }
  `);

  const revokeLineRes = await mutate({
    mutation: gql`
      mutation {
        revokeAccess(
          input: { entityID: "12345678", type: Line, number: "4007" }
        ) {
          success
          message
          code
        }
      }
    `,
  });
  expect(revokeLineRes.errors).toBeUndefined();
  expect(revokeLineRes.data).toMatchInlineSnapshot(`
    Object {
      "revokeAccess": Object {
        "code": 4007,
        "message": "The user appears to be not logged in.",
        "success": false,
      },
    }
  `);
});
