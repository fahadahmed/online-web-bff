import { createTestClient, gql } from 'test/apolloTestUtils';
import { server as mockServer } from 'test/server';
import { getProductPromotionsMPDMock } from 'datasources/product/promotions/mpd/mocks/handlers';

beforeEach(() => {
  mockServer.use(getProductPromotionsMPDMock);
});

test('returns the multi product discount for the selected eligible plans', async () => {
  const { query } = createTestClient();

  const res = await query({
    query: gql`
      query {
        mpdPromotions(
          offerIds: ["fast_mobile_plan-of_hcf8q", "faster_mobile_plan-of_wlnqm"]
        ) {
          price {
            basePrice
            effectivePrice
            discount {
              appliedValue
              discountCategory
              discountedValue
            }
          }
          bundles {
            id
            items {
              id
              price {
                basePrice
                effectivePrice
                discount {
                  appliedValue
                  discountCategory
                  discountedValue
                }
              }
              productOfferingId
            }
          }
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchSnapshot();
});
