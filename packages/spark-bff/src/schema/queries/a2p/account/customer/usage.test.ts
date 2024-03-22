import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import {
  getUsageMock,
  getUsageMockNoCustomer,
} from 'datasources/a2p/customer/mocks/getUsage';

test('returns usage query when customer not present', async () => {
  server.use(getUsageMockNoCustomer);

  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        a2p(customerNumber: "234099981") {
          usage(dateRange: last7days) {
            length
            interval
            dateTimeStart
            dateTimeEnd
            series {
              dateTimeStart
              dateTimeEnd
              totalSmsCount
              sentSmsCount
              deliveredSmsCount
              failedSmsCount
            }
          }
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();

  expect(res.data.a2p).toMatchInlineSnapshot(`
    Object {
      "usage": Object {
        "dateTimeEnd": null,
        "dateTimeStart": null,
        "interval": null,
        "length": null,
        "series": Array [],
      },
    }
  `);
});

test('returns usage query', async () => {
  server.use(getUsageMock);

  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        a2p(customerNumber: "234099981") {
          usage(dateRange: last7days) {
            length
            interval
            dateTimeStart
            dateTimeEnd
            series {
              dateTimeStart
              dateTimeEnd
              totalSmsCount
              sentSmsCount
              deliveredSmsCount
              failedSmsCount
            }
          }
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();

  expect(res.data.a2p).toMatchInlineSnapshot(`
    Object {
      "usage": Object {
        "dateTimeEnd": "2021-01-01T00:00:00.000Z",
        "dateTimeStart": "2020-12-26T00:00:00.000Z",
        "interval": "DAYS",
        "length": 7,
        "series": Array [
          Object {
            "dateTimeEnd": "2020-12-27T00:00:00.000Z",
            "dateTimeStart": "2020-12-26T00:00:00.000Z",
            "deliveredSmsCount": 1,
            "failedSmsCount": 1,
            "sentSmsCount": 1,
            "totalSmsCount": 3,
          },
          Object {
            "dateTimeEnd": "2020-12-28T00:00:00.000Z",
            "dateTimeStart": "2020-12-27T00:00:00.000Z",
            "deliveredSmsCount": 1,
            "failedSmsCount": 1,
            "sentSmsCount": 1,
            "totalSmsCount": 3,
          },
          Object {
            "dateTimeEnd": "2020-12-29T00:00:00.000Z",
            "dateTimeStart": "2020-12-28T00:00:00.000Z",
            "deliveredSmsCount": 1,
            "failedSmsCount": 1,
            "sentSmsCount": 1,
            "totalSmsCount": 3,
          },
          Object {
            "dateTimeEnd": "2020-12-30T00:00:00.000Z",
            "dateTimeStart": "2020-12-29T00:00:00.000Z",
            "deliveredSmsCount": 1,
            "failedSmsCount": 1,
            "sentSmsCount": 1,
            "totalSmsCount": 3,
          },
          Object {
            "dateTimeEnd": "2020-12-31T00:00:00.000Z",
            "dateTimeStart": "2020-12-30T00:00:00.000Z",
            "deliveredSmsCount": 1,
            "failedSmsCount": 1,
            "sentSmsCount": 1,
            "totalSmsCount": 3,
          },
          Object {
            "dateTimeEnd": "2021-01-01T00:00:00.000Z",
            "dateTimeStart": "2020-12-31T00:00:00.000Z",
            "deliveredSmsCount": 1,
            "failedSmsCount": 1,
            "sentSmsCount": 1,
            "totalSmsCount": 3,
          },
          Object {
            "dateTimeEnd": "2021-01-02T00:00:00.000Z",
            "dateTimeStart": "2021-01-01T00:00:00.000Z",
            "deliveredSmsCount": 1,
            "failedSmsCount": 1,
            "sentSmsCount": 1,
            "totalSmsCount": 3,
          },
        ],
      },
    }
  `);
});
