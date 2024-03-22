import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { addContentProviderMock } from 'datasources/a2p/customer/mocks/addContentProvider';

test('request add content provider', async () => {
  server.use(addContentProviderMock);

  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        a2pAddContentProvider(
          input: {
            customerNumber: "123"
            contentProviderName: "Lyft"
            helpdeskEmail: "support@lyft.co.nz"
            phoneNumber: "0800 022 3022"
            customerCareUrl: "https://www.lyft.com/support"
          }
        ) {
          contentProviderId
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "a2pAddContentProvider": Object {
        "contentProviderId": "1",
      },
    }
  `);
});
