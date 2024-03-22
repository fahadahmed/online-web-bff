import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { modifyContentProviderMock } from 'datasources/a2p/customer/mocks/modifyContentProvider';

test('request add service request', async () => {
  server.use(modifyContentProviderMock);

  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        a2pModifyContentProvider(
          input: {
            customerNumber: "1234567"
            contentProviderId: 123
            contentProviderName: "Lyft"
            helpdeskEmail: "support@lyft.co.nz"
            phoneNumber: "0800 022 3022"
            customerCareUrl: "https://www.lyft.com/support"
          }
        ) {
          status
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "a2pModifyContentProvider": Object {
        "status": true,
      },
    }
    `);
});
