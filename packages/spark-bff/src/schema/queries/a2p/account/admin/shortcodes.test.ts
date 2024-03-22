import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { getAdminShortcodesMock } from 'datasources/a2p/shortcodes/mocks/getShortcodes';

test('test shortcodesOverview query with the date range', async () => {
  server.use(getAdminShortcodesMock);

  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        a2p(customerNumber: "1234567") {
          adminShortcodes(dateRange: last7days) {
            customerNumber
            customerName
            shortCodeNumber
            status
            type
            ctas
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
  "adminShortcodes": Array [
    Object {
      "ctas": Array [
        "VIEW",
        "EDIT",
        "DEACTIVATE",
      ],
      "customerName": "Spark",
      "customerNumber": 1,
      "deliveredSmsCount": 100,
      "failedSmsCount": 100,
      "sentSmsCount": 100,
      "shortCodeNumber": 1243,
      "status": "ACTIVE",
      "totalSmsCount": 300,
      "type": "STANDARD",
    },
    Object {
      "ctas": Array [
        "VIEW",
        "EDIT",
        "DEACTIVATE",
      ],
      "customerName": "Spark",
      "customerNumber": 1,
      "deliveredSmsCount": 100,
      "failedSmsCount": 100,
      "sentSmsCount": 100,
      "shortCodeNumber": 5463,
      "status": "ACTIVE",
      "totalSmsCount": 300,
      "type": "STANDARD",
    },
    Object {
      "ctas": Array [
        "VIEW",
        "EDIT",
        "DEACTIVATE",
      ],
      "customerName": "Spark",
      "customerNumber": 1,
      "deliveredSmsCount": 100,
      "failedSmsCount": 100,
      "sentSmsCount": 100,
      "shortCodeNumber": 5654,
      "status": "ACTIVE",
      "totalSmsCount": 300,
      "type": "STANDARD",
    },
    Object {
      "ctas": Array [
        "VIEW",
        "EDIT",
        "DEACTIVATE",
      ],
      "customerName": "Spark",
      "customerNumber": 1,
      "deliveredSmsCount": 100,
      "failedSmsCount": 100,
      "sentSmsCount": 100,
      "shortCodeNumber": 7545,
      "status": "ACTIVE",
      "totalSmsCount": 300,
      "type": "STANDARD",
    },
    Object {
      "ctas": Array [
        "VIEW",
        "EDIT",
        "DEACTIVATE",
      ],
      "customerName": "Spark",
      "customerNumber": 1,
      "deliveredSmsCount": 100,
      "failedSmsCount": 100,
      "sentSmsCount": 100,
      "shortCodeNumber": 4543,
      "status": "ACTIVE",
      "totalSmsCount": 300,
      "type": "STANDARD",
    },
  ],
}
`);
});

test('test shortcodesOverview query without a date range', async () => {
  server.use(getAdminShortcodesMock);

  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        a2p(customerNumber: "1234567") {
          adminShortcodes {
            customerNumber
            customerName
            shortCodeNumber
            status
            type
            ctas
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
  "adminShortcodes": Array [
    Object {
      "ctas": Array [
        "VIEW",
        "EDIT",
        "DEACTIVATE",
      ],
      "customerName": "Spark",
      "customerNumber": 1,
      "deliveredSmsCount": 100,
      "failedSmsCount": 100,
      "sentSmsCount": 100,
      "shortCodeNumber": 1243,
      "status": "ACTIVE",
      "totalSmsCount": 300,
      "type": "STANDARD",
    },
    Object {
      "ctas": Array [
        "VIEW",
        "EDIT",
        "DEACTIVATE",
      ],
      "customerName": "Spark",
      "customerNumber": 1,
      "deliveredSmsCount": 100,
      "failedSmsCount": 100,
      "sentSmsCount": 100,
      "shortCodeNumber": 5463,
      "status": "ACTIVE",
      "totalSmsCount": 300,
      "type": "STANDARD",
    },
    Object {
      "ctas": Array [
        "VIEW",
        "EDIT",
        "DEACTIVATE",
      ],
      "customerName": "Spark",
      "customerNumber": 1,
      "deliveredSmsCount": 100,
      "failedSmsCount": 100,
      "sentSmsCount": 100,
      "shortCodeNumber": 5654,
      "status": "ACTIVE",
      "totalSmsCount": 300,
      "type": "STANDARD",
    },
    Object {
      "ctas": Array [
        "VIEW",
        "EDIT",
        "DEACTIVATE",
      ],
      "customerName": "Spark",
      "customerNumber": 1,
      "deliveredSmsCount": 100,
      "failedSmsCount": 100,
      "sentSmsCount": 100,
      "shortCodeNumber": 7545,
      "status": "ACTIVE",
      "totalSmsCount": 300,
      "type": "STANDARD",
    },
    Object {
      "ctas": Array [
        "VIEW",
        "EDIT",
        "DEACTIVATE",
      ],
      "customerName": "Spark",
      "customerNumber": 1,
      "deliveredSmsCount": 100,
      "failedSmsCount": 100,
      "sentSmsCount": 100,
      "shortCodeNumber": 4543,
      "status": "ACTIVE",
      "totalSmsCount": 300,
      "type": "STANDARD",
    },
  ],
}
`);
});
