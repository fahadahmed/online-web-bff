import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import handlers from 'datasources/location/pointOfInterest/mocks/handlers';

beforeEach(() => {
  server.use(...handlers);
});

test('retrieve a list of Spark consumer stores with stock details', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        clickAndCollectStores(serviceType: STORE, location: "5 Park") {
          storeList {
            id
            name
            address
            phoneNumber
            storeImage
            inStock
            operatingHours {
              day
              open
              close
            }
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchSnapshot();
});
