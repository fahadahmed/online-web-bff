import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import handlers from 'datasources/user/access/mocks/handlers';

beforeEach(() => {
  server.use(...handlers);
});

test('request account access successfully', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        addAccountAccess(
          input: {
            accountNumber: "987654321"
            lineNumber: "0271234567"
            firstName: "Jim"
            lastName: "Builder"
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
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "addAccountAccess": Object {
        "code": 2018,
        "message": "",
        "nextStep": null,
        "success": true,
        "title": "An email has been sent for approval.",
      },
    }
  `);
});

test('add account access incomplete when business name is required', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        addAccountAccess(input: { accountNumber: "112233" }) {
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
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "addAccountAccess": Object {
        "code": 3003,
        "message": "",
        "nextStep": "BusinessNameEntry",
        "success": false,
        "title": null,
      },
    }
  `);
});

test('add account access incomplete when full name is required', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        addAccountAccess(input: { accountNumber: "123456" }) {
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
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "addAccountAccess": Object {
        "code": 3002,
        "message": "",
        "nextStep": "FullNameEntry",
        "success": false,
        "title": null,
      },
    }
  `);
});

test('add account access incomplete when line number is required', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        addAccountAccess(
          input: { accountNumber: "112233", businessName: "spark" }
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
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "addAccountAccess": Object {
        "code": 3008,
        "message": "",
        "nextStep": "LineNumberEntry",
        "success": false,
        "title": null,
      },
    }
  `);
});

test('add account access incomplete when password is required', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        addAccountAccess(
          input: {
            accountNumber: "112233"
            businessName: "spark"
            lineNumber: "0271234567"
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
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "addAccountAccess": Object {
        "code": 3001,
        "message": "",
        "nextStep": "PasswordEntry",
        "success": false,
        "title": null,
      },
    }
  `);
});

test('add account access error when password is invalid', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        addAccountAccess(
          input: {
            accountNumber: "123456"
            firstName: "daniel"
            lastName: "is cool"
            lineNumber: "027123456"
            password: "password"
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
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "addAccountAccess": Object {
        "code": 4034,
        "message": "Your password is incorrect. Please try again.",
        "nextStep": null,
        "success": false,
        "title": null,
      },
    }
  `);
});

test('add account access successfuly as owner', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        addAccountAccess(
          input: {
            accountNumber: "123456"
            firstName: "daniel"
            lastName: "is cool"
            lineNumber: "027123456"
            password: "secret"
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
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "addAccountAccess": Object {
        "code": 2009,
        "message": "As the owner you can view usage, add or change products and pay bills.",
        "nextStep": null,
        "success": true,
        "title": "Your account has been added.",
      },
    }
  `);
});
