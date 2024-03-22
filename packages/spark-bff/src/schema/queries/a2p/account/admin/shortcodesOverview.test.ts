import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { getAdminShortcodesOverviewMock } from 'datasources/a2p/shortcodes/mocks/getShortcodesOverview';

test('test shortcodesOverview query', async () => {
  server.use(getAdminShortcodesOverviewMock);

  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        a2p(customerNumber: "1234567") {
          adminShortcodesOverview(dateRange: last7days) {
            length
            interval
            dateTimeStart
            dateTimeEnd
            totalShortcodesCount
            activeShortcodesCount
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
      "adminShortcodesOverview": Object {
        "activeShortcodesCount": 540,
        "dateTimeEnd": "2021-01-01T00:00:00.000Z",
        "dateTimeStart": "2020-12-25T00:00:00.000Z",
        "interval": "DAYS",
        "length": 7,
        "pendingShortcodesCount": 7323,
        "suspendedShortcodesCount": 100,
        "totalShortcodesCount": 25,
      },
    }
    `);
});
