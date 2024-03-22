import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import {
  getCustomerOverviewMock,
  getCustomerOverviewMockWhenNoCustomer,
} from 'datasources/a2p/customer/mocks/getCustomerOverview';

test('test overview query', async () => {
  server.use(getCustomerOverviewMock);

  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        a2p(customerNumber: "234099981") {
          overview(dateRange: last7days) {
            length
            interval
            dateTimeStart
            dateTimeEnd
            totalSmsCount
            sentSmsCount
            deliveredSmsCount
            failedSmsCount
          }
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();

  expect(res.data.a2p).toMatchInlineSnapshot(`
    Object {
      "overview": Object {
        "dateTimeEnd": "2021-01-01T00:00:00.000Z",
        "dateTimeStart": "2020-12-25T00:00:00.000Z",
        "deliveredSmsCount": 100,
        "failedSmsCount": 100,
        "interval": "DAYS",
        "length": 7,
        "sentSmsCount": 100,
        "totalSmsCount": 300,
      },
    }
  `);
});

test('test overview query', async () => {
  server.use(getCustomerOverviewMockWhenNoCustomer);

  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        a2p(customerNumber: "234099981") {
          overview(dateRange: last7days) {
            length
            interval
            dateTimeStart
            dateTimeEnd
            totalSmsCount
            sentSmsCount
            deliveredSmsCount
            failedSmsCount
          }
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();

  expect(res.data.a2p).toMatchInlineSnapshot(`
    Object {
      "overview": Object {
        "dateTimeEnd": null,
        "dateTimeStart": null,
        "deliveredSmsCount": 0,
        "failedSmsCount": 0,
        "interval": null,
        "length": null,
        "sentSmsCount": 0,
        "totalSmsCount": 0,
      },
    }
  `);
});
