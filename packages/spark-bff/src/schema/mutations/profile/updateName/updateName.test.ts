import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { userChangeNameInfoMock } from 'datasources/user/identityService/mocks/handlers';

beforeEach(() => {
  server.use(userChangeNameInfoMock);
});

test('returns success response for profile name change', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        updateName(input: { firstName: "Dwayne", lastName: "Johnson" }) {
          message
          code
          success
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "updateName": Object {
        "code": 2000,
        "message": "Success",
        "success": true,
      },
    }
  `);
});
