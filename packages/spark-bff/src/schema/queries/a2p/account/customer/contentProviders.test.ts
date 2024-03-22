import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { getContentProvidersMock } from 'datasources/a2p/customer/mocks/getContentProviders';

test('test contentProviders query', async () => {
  server.use(getContentProvidersMock);

  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        a2p(customerNumber: "234099981") {
          contentProviders {
            customerNumber
            customerName
            contentProviderId
            contentProviderName
            helpdeskEmail
            phoneNumber
            customerCareUrl
            ctas
          }
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();

  expect(res.data.a2p).toMatchInlineSnapshot(`
    Object {
      "contentProviders": Array [
        Object {
          "contentProviderId": 3,
          "contentProviderName": "Uber",
          "ctas": Array [
            "EDIT",
            "DELETE",
          ],
          "customerCareUrl": "https://www.uber.com/support",
          "customerName": "Twilio",
          "customerNumber": "1",
          "helpdeskEmail": "support@uber.co.nz",
          "phoneNumber": "0800 022 9233",
        },
        Object {
          "contentProviderId": 2,
          "contentProviderName": "Airbnb",
          "ctas": Array [
            "EDIT",
            "DELETE",
          ],
          "customerCareUrl": "https://www.airbnb.com/support",
          "customerName": "Twilio",
          "customerNumber": "1",
          "helpdeskEmail": "support@airbnb.co.nz",
          "phoneNumber": "0800 022 2222",
        },
        Object {
          "contentProviderId": 1,
          "contentProviderName": "Lyft",
          "ctas": Array [
            "EDIT",
            "DELETE",
          ],
          "customerCareUrl": "https://www.lyft.com/support",
          "customerName": "Twilio",
          "customerNumber": "1",
          "helpdeskEmail": "support@lyft.co.nz",
          "phoneNumber": "0800 022 3022",
        },
      ],
    }
  `);
});
