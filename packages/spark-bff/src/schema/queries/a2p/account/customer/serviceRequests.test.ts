import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { getServiceRequestsMock } from 'datasources/a2p/customer/mocks/getServiceRequests';

test('returns serviceRequests query', async () => {
  server.use(getServiceRequestsMock);

  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        a2p(customerNumber: "234099981") {
          serviceRequests {
            serviceRequestId
            contentProviderId
            assignedShortcodeNumber
            requestedShortcodeNumber
            messageType
            status
            dateTimeCreated
            dateTimeModified
          }
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();

  expect(res.data.a2p).toMatchInlineSnapshot(`
Object {
  "serviceRequests": Array [
    Object {
      "assignedShortcodeNumber": "1234",
      "contentProviderId": 1,
      "dateTimeCreated": "2020-12-25T00:00:00.000Z",
      "dateTimeModified": "2020-12-25T00:00:00.000Z",
      "messageType": "STANDARD",
      "requestedShortcodeNumber": "1234",
      "serviceRequestId": "REQ001055759",
      "status": "OPEN",
    },
  ],
}
`);
});
