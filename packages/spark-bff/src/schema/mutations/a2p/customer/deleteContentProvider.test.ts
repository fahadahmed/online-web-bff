import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { deleteContentProviderMock } from 'datasources/a2p/customer/mocks/deleteContentProvider';

test('request add content provider', async () => {
  server.use(deleteContentProviderMock);

  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        a2pDeleteContentProvider(
          input: { customerNumber: "1234567", contentProviderId: 123 }
        ) {
          status
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "a2pDeleteContentProvider": Object {
        "status": true,
      },
    }
    `);
});
