import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { getAdminOverviewMock } from 'datasources/a2p/customer/mocks/getAdminOverview';

test('test adminOverview query', async () => {
  server.use(getAdminOverviewMock);

  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        a2p {
          adminOverview(dateRange: last7days) {
            length
            interval
            dateTimeStart
            dateTimeEnd
            totalCustomersCount
            totalShortcodesCount
            pendingShortcodesCount
            suspendedShortcodesCount
          }
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();

  expect(res.data.a2p).toMatchInlineSnapshot(`
Object {
  "adminOverview": Object {
    "dateTimeEnd": "2021-01-01T00:00:00.000Z",
    "dateTimeStart": "2020-12-25T00:00:00.000Z",
    "interval": "DAYS",
    "length": 7,
    "pendingShortcodesCount": 7323,
    "suspendedShortcodesCount": 100,
    "totalCustomersCount": 25,
    "totalShortcodesCount": 540,
  },
}
`);
});
