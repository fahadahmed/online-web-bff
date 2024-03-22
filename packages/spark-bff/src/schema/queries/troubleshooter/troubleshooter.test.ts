import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import handlers from 'datasources/line/assure/connectionTroubleshooter/mocks/handlers';

beforeEach(() => {
  server.use(...handlers);
});

test('returns troubleshooting information', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        troubleshooter(
          lineNumber: "099991111"
          diagnosticCode: "internet_down-line_down-modem_can_not_reach"
          modemModel: "HG999b"
        ) {
          modemManufacturer
          modemImage
          modemSerialNumber
          diagnosticSummaryCode
          initialStep
          stepForModemModel
          helpSteps {
            stepId
            title
            bodyList {
              copy
              componentType
            }
            imageList {
              url
            }
            ctaTitle
            ctaList {
              label
              type
              webCTA
            }
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.troubleshooter).toMatchSnapshot();
});

test('returns troubleshooting information when optional argument is missing', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        troubleshooter(
          lineNumber: "099991111"
          diagnosticCode: "internet_down-line_down-modem_can_not_reach"
        ) {
          modemManufacturer
          modemImage
          modemSerialNumber
          diagnosticSummaryCode
          initialStep
          stepForModemModel
          helpSteps {
            stepId
            title
            bodyList {
              copy
              componentType
            }
            imageList {
              url
            }
            ctaTitle
            ctaList {
              label
              type
              webCTA
            }
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.troubleshooter).toMatchSnapshot();
});
