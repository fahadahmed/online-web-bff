import { getProductOffersByOfferIdsHandler } from 'datasources/product/offers/mocks/handlers';
import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';

test('returns all the product offer details data with no errors', async () => {
  server.use(getProductOffersByOfferIdsHandler);

  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query ProductOfferDetailsQuery(
        $offerIds: [String!]
        $externalIds: [String!]
      ) {
        productOfferDetails(offerIds: $offerIds, externalIds: $externalIds) {
          offerDetails {
            id
            externalId
            name
            description
            price {
              basePrice
              effectivePrice
            }
            productCharacteristics {
              entitledEntity
              isIncluded
            }
          }
        }
      }
    `,
    variables: {
      offerIds: ['misc050385'],
      externalIds: ['legacy050114'],
    },
  });

  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchSnapshot();
});
