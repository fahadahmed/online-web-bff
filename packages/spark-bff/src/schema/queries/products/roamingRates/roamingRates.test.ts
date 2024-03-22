import { createTestClient, gql } from 'test/apolloTestUtils';
import { server as mockServer } from 'test/server';
import { roamingRatesHandler } from 'datasources/product/roamingRates/mocks/handlers';

beforeEach(() => {
  mockServer.use(roamingRatesHandler);
});

test('returns success for fetching the rates roaming', async () => {
  const { query } = createTestClient();

  const res = await query({
    query: gql`
      query {
        roamingRates(destinationIso3: "AUS", accountType: POSTPAID) {
          destinations {
            destinationName
            destinationCode {
              isoAlpha3
            }
            network
            zone
            rates {
              accountType
              data
              dataOverage
              moc
              mtc
              text
            }
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchSnapshot();
});
