import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { getShortcodeMock } from 'datasources/a2p/customer/mocks/getShortcode';

test('returns a single shortcode', async () => {
  server.use(getShortcodeMock);

  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        a2p(customerNumber: "234099981") {
          shortcode(shortcode: "123") {
            customerNumber
            customerName
            shortCodeNumber
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
            contentProviderId
            preferredNumber
            messageType
            messageUsage
            serviceEndDateTime
            carriers
            serviceName
            serviceDescription
            mobileTerminatingMessageExample
            mobileOriginatingMessageExample
            serviceMarketingChannels
            expectedMessageVolume
            predictedPeakTimeDescription
            firstName
            lastName
            jobTitle
            serviceComplianceDescription
            signature
          }
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();

  expect(res.data.a2p).toMatchInlineSnapshot(`
Object {
  "shortcode": Object {
    "carriers": Array [
      "SPARK",
      "TWODEGREES",
      "VODAFONE",
    ],
    "contentProviderId": 1,
    "ctas": Array [
      "VIEW",
      "EDIT",
      "DEACTIVATE",
    ],
    "customerName": "Spark",
    "customerNumber": "1",
    "expectedMessageVolume": "LOW",
    "firstName": "John",
    "jobTitle": "Master Roaster",
    "lastName": "Doe",
    "messageType": "STANDARD",
    "messageUsage": "MARKETING",
    "mobileOriginatingMessageExample": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut.",
    "mobileTerminatingMessageExample": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut.",
    "predictedPeakTimeDescription": "Every Friday, Christmas eve",
    "preferredNumber": null,
    "serviceComplianceDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut.",
    "serviceDescription": "Every seven days, employees using their company email account on their mobile phones are automatically logged out of the network and required to log back in for security reasons. As part of this they are sent a code via SMS and asked to enter this along with their email network password in order to log in.",
    "serviceEndDateTime": "2020-12-25T00:00:00.000Z",
    "serviceMarketingChannels": Array [
      "PRINT",
      "ONLINE",
      "RADIO",
    ],
    "serviceName": "Two-factor authentication for email account log-in",
    "shortCodeNumber": 1243,
    "signature": "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",
    "status": "ACTIVE",
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
}
`);
});
