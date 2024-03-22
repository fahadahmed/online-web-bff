import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { modifyShortcodeMock } from 'datasources/a2p/customer/mocks/modifyShortcode';

test('request modify short code', async () => {
  server.use(modifyShortcodeMock);

  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        a2pModifyShortcode(
          input: {
            customerNumber: "12343567"
            shortcodeNumber: "123"
            status: INACTIVE
          }
        ) {
          code
          message
          success
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "a2pModifyShortcode": Object {
        "code": 2000,
        "message": "Success",
        "success": true,
      },
    }
  `);
});
