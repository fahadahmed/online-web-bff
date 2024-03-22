import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { getShortcodesMock } from 'datasources/a2p/customer/mocks/getShortcodes';

test('returns shortcodes query by the date range', async () => {
  server.use(getShortcodesMock);

  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        a2p(customerNumber: "234099981") {
          shortcodes(dateRange: last7days) {
            customerNumber
            customerName
            shortCodeNumber
            type
            status
            ctas
            usage {
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
      }
    `,
  });
  expect(res.errors).toBeUndefined();

  expect(res.data.a2p).toMatchInlineSnapshot(`
Object {
  "shortcodes": Array [
    Object {
      "ctas": Array [
        "VIEW",
        "EDIT",
        "DEACTIVATE",
      ],
      "customerName": "Spark",
      "customerNumber": "1",
      "shortCodeNumber": 1243,
      "status": "ACTIVE",
      "type": "STANDARD",
      "usage": Object {
        "dateTimeEnd": "2021-01-01T00:00:00.000Z",
        "dateTimeStart": "2020-12-25T00:00:00.000Z",
        "interval": "DAYS",
        "length": 7,
        "series": Array [
          Object {
            "dateTimeEnd": "2021-01-02T00:00:00.000Z",
            "dateTimeStart": "2021-01-01T00:00:00.000Z",
            "deliveredSmsCount": 100,
            "failedSmsCount": 100,
            "sentSmsCount": 100,
            "totalSmsCount": 303,
          },
        ],
      },
    },
    Object {
      "ctas": Array [
        "VIEW",
        "EDIT",
        "DEACTIVATE",
      ],
      "customerName": "Spark",
      "customerNumber": "1",
      "shortCodeNumber": 5463,
      "status": "ACTIVE",
      "type": "STANDARD",
      "usage": Object {
        "dateTimeEnd": "2021-01-01T00:00:00.000Z",
        "dateTimeStart": "2020-12-25T00:00:00.000Z",
        "interval": "DAYS",
        "length": 7,
        "series": Array [
          Object {
            "dateTimeEnd": "2021-01-02T00:00:00.000Z",
            "dateTimeStart": "2021-01-01T00:00:00.000Z",
            "deliveredSmsCount": 100,
            "failedSmsCount": 100,
            "sentSmsCount": 100,
            "totalSmsCount": 301,
          },
        ],
      },
    },
    Object {
      "ctas": Array [
        "VIEW",
        "EDIT",
        "DEACTIVATE",
      ],
      "customerName": "Spark",
      "customerNumber": "1",
      "shortCodeNumber": 5654,
      "status": "ACTIVE",
      "type": "STANDARD",
      "usage": Object {
        "dateTimeEnd": "2021-01-01T00:00:00.000Z",
        "dateTimeStart": "2020-12-25T00:00:00.000Z",
        "interval": "DAYS",
        "length": 7,
        "series": Array [
          Object {
            "dateTimeEnd": "2021-01-02T00:00:00.000Z",
            "dateTimeStart": "2021-01-01T00:00:00.000Z",
            "deliveredSmsCount": 100,
            "failedSmsCount": 100,
            "sentSmsCount": 100,
            "totalSmsCount": 302,
          },
        ],
      },
    },
    Object {
      "ctas": Array [
        "VIEW",
        "EDIT",
        "DEACTIVATE",
      ],
      "customerName": "Spark",
      "customerNumber": "1",
      "shortCodeNumber": 7545,
      "status": "ACTIVE",
      "type": "STANDARD",
      "usage": Object {
        "dateTimeEnd": "2021-01-01T00:00:00.000Z",
        "dateTimeStart": "2020-12-25T00:00:00.000Z",
        "interval": "DAYS",
        "length": 7,
        "series": Array [
          Object {
            "dateTimeEnd": "2021-01-02T00:00:00.000Z",
            "dateTimeStart": "2021-01-01T00:00:00.000Z",
            "deliveredSmsCount": 100,
            "failedSmsCount": 100,
            "sentSmsCount": 100,
            "totalSmsCount": 305,
          },
        ],
      },
    },
    Object {
      "ctas": Array [
        "VIEW",
        "EDIT",
        "DEACTIVATE",
      ],
      "customerName": "Spark",
      "customerNumber": "1",
      "shortCodeNumber": 4543,
      "status": "ACTIVE",
      "type": "STANDARD",
      "usage": Object {
        "dateTimeEnd": "2021-01-01T00:00:00.000Z",
        "dateTimeStart": "2020-12-25T00:00:00.000Z",
        "interval": "DAYS",
        "length": 7,
        "series": Array [
          Object {
            "dateTimeEnd": "2021-01-02T00:00:00.000Z",
            "dateTimeStart": "2021-01-01T00:00:00.000Z",
            "deliveredSmsCount": 100,
            "failedSmsCount": 100,
            "sentSmsCount": 100,
            "totalSmsCount": 300,
          },
        ],
      },
    },
  ],
}
`);
});

test('returns shortcodes query without a date range', async () => {
  server.use(getShortcodesMock);

  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        a2p(customerNumber: "234099981") {
          shortcodes {
            customerNumber
            customerName
            shortCodeNumber
            type
            status
            ctas
            usage {
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
      }
    `,
  });
  expect(res.errors).toBeUndefined();

  expect(res.data.a2p).toMatchInlineSnapshot(`
Object {
  "shortcodes": Array [
    Object {
      "ctas": Array [
        "VIEW",
        "EDIT",
        "DEACTIVATE",
      ],
      "customerName": "Spark",
      "customerNumber": "1",
      "shortCodeNumber": 1243,
      "status": "ACTIVE",
      "type": "STANDARD",
      "usage": Object {
        "dateTimeEnd": "2021-01-01T00:00:00.000Z",
        "dateTimeStart": "2020-12-25T00:00:00.000Z",
        "interval": "DAYS",
        "length": 7,
        "series": Array [
          Object {
            "dateTimeEnd": "2021-01-02T00:00:00.000Z",
            "dateTimeStart": "2021-01-01T00:00:00.000Z",
            "deliveredSmsCount": 100,
            "failedSmsCount": 100,
            "sentSmsCount": 100,
            "totalSmsCount": 303,
          },
        ],
      },
    },
    Object {
      "ctas": Array [
        "VIEW",
        "EDIT",
        "DEACTIVATE",
      ],
      "customerName": "Spark",
      "customerNumber": "1",
      "shortCodeNumber": 5463,
      "status": "ACTIVE",
      "type": "STANDARD",
      "usage": Object {
        "dateTimeEnd": "2021-01-01T00:00:00.000Z",
        "dateTimeStart": "2020-12-25T00:00:00.000Z",
        "interval": "DAYS",
        "length": 7,
        "series": Array [
          Object {
            "dateTimeEnd": "2021-01-02T00:00:00.000Z",
            "dateTimeStart": "2021-01-01T00:00:00.000Z",
            "deliveredSmsCount": 100,
            "failedSmsCount": 100,
            "sentSmsCount": 100,
            "totalSmsCount": 301,
          },
        ],
      },
    },
    Object {
      "ctas": Array [
        "VIEW",
        "EDIT",
        "DEACTIVATE",
      ],
      "customerName": "Spark",
      "customerNumber": "1",
      "shortCodeNumber": 5654,
      "status": "ACTIVE",
      "type": "STANDARD",
      "usage": Object {
        "dateTimeEnd": "2021-01-01T00:00:00.000Z",
        "dateTimeStart": "2020-12-25T00:00:00.000Z",
        "interval": "DAYS",
        "length": 7,
        "series": Array [
          Object {
            "dateTimeEnd": "2021-01-02T00:00:00.000Z",
            "dateTimeStart": "2021-01-01T00:00:00.000Z",
            "deliveredSmsCount": 100,
            "failedSmsCount": 100,
            "sentSmsCount": 100,
            "totalSmsCount": 302,
          },
        ],
      },
    },
    Object {
      "ctas": Array [
        "VIEW",
        "EDIT",
        "DEACTIVATE",
      ],
      "customerName": "Spark",
      "customerNumber": "1",
      "shortCodeNumber": 7545,
      "status": "ACTIVE",
      "type": "STANDARD",
      "usage": Object {
        "dateTimeEnd": "2021-01-01T00:00:00.000Z",
        "dateTimeStart": "2020-12-25T00:00:00.000Z",
        "interval": "DAYS",
        "length": 7,
        "series": Array [
          Object {
            "dateTimeEnd": "2021-01-02T00:00:00.000Z",
            "dateTimeStart": "2021-01-01T00:00:00.000Z",
            "deliveredSmsCount": 100,
            "failedSmsCount": 100,
            "sentSmsCount": 100,
            "totalSmsCount": 305,
          },
        ],
      },
    },
    Object {
      "ctas": Array [
        "VIEW",
        "EDIT",
        "DEACTIVATE",
      ],
      "customerName": "Spark",
      "customerNumber": "1",
      "shortCodeNumber": 4543,
      "status": "ACTIVE",
      "type": "STANDARD",
      "usage": Object {
        "dateTimeEnd": "2021-01-01T00:00:00.000Z",
        "dateTimeStart": "2020-12-25T00:00:00.000Z",
        "interval": "DAYS",
        "length": 7,
        "series": Array [
          Object {
            "dateTimeEnd": "2021-01-02T00:00:00.000Z",
            "dateTimeStart": "2021-01-01T00:00:00.000Z",
            "deliveredSmsCount": 100,
            "failedSmsCount": 100,
            "sentSmsCount": 100,
            "totalSmsCount": 300,
          },
        ],
      },
    },
  ],
}
`);
});

test('returns top N shortcodes query', async () => {
  server.use(getShortcodesMock);

  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        a2p(customerNumber: "234099981") {
          shortcodes(dateRange: last7days, topAmount: 2) {
            customerNumber
            customerName
            shortCodeNumber
            type
            status
            ctas
            usage {
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
      }
    `,
  });
  expect(res.errors).toBeUndefined();

  expect(res.data.a2p).toMatchInlineSnapshot(`
Object {
  "shortcodes": Array [
    Object {
      "ctas": Array [
        "VIEW",
        "EDIT",
        "DEACTIVATE",
      ],
      "customerName": "Spark",
      "customerNumber": "1",
      "shortCodeNumber": 7545,
      "status": "ACTIVE",
      "type": "STANDARD",
      "usage": Object {
        "dateTimeEnd": "2021-01-01T00:00:00.000Z",
        "dateTimeStart": "2020-12-25T00:00:00.000Z",
        "interval": "DAYS",
        "length": 7,
        "series": Array [
          Object {
            "dateTimeEnd": "2021-01-02T00:00:00.000Z",
            "dateTimeStart": "2021-01-01T00:00:00.000Z",
            "deliveredSmsCount": 100,
            "failedSmsCount": 100,
            "sentSmsCount": 100,
            "totalSmsCount": 305,
          },
        ],
      },
    },
    Object {
      "ctas": Array [
        "VIEW",
        "EDIT",
        "DEACTIVATE",
      ],
      "customerName": "Spark",
      "customerNumber": "1",
      "shortCodeNumber": 1243,
      "status": "ACTIVE",
      "type": "STANDARD",
      "usage": Object {
        "dateTimeEnd": "2021-01-01T00:00:00.000Z",
        "dateTimeStart": "2020-12-25T00:00:00.000Z",
        "interval": "DAYS",
        "length": 7,
        "series": Array [
          Object {
            "dateTimeEnd": "2021-01-02T00:00:00.000Z",
            "dateTimeStart": "2021-01-01T00:00:00.000Z",
            "deliveredSmsCount": 100,
            "failedSmsCount": 100,
            "sentSmsCount": 100,
            "totalSmsCount": 303,
          },
        ],
      },
    },
  ],
}
`);
});
