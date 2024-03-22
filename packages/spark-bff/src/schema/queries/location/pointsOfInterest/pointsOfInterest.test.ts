import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import handlers from 'datasources/location/pointOfInterest/mocks/handlers';

beforeEach(() => {
  server.use(...handlers);
});

test('retrieve a list of Spark consumer stores', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        location {
          pointsOfInterest(serviceType: STORE) {
            featured
            displayName
            isStore
            isWifiAvailable
            isRecyclingOffered
            addressLine1
            addressLine2
            emailAddress
            phoneNumber
            suburb
            city
            directions
            latitude
            longitude
            image
            distanceFromLocation
            operatingHours {
              day
              open
              close
            }
            contacts {
              role
              name
            }
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data.location).toMatchSnapshot();
});

test('retrieve a list of Spark consumer stores with a geo location', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        location {
          pointsOfInterest(serviceType: STORE, location: "-75.235,23.678") {
            featured
            displayName
            isStore
            isWifiAvailable
            isRecyclingOffered
            addressLine1
            addressLine2
            emailAddress
            phoneNumber
            suburb
            city
            directions
            latitude
            longitude
            image
            distanceFromLocation
            operatingHours {
              day
              open
              close
            }
            contacts {
              role
              name
            }
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data.location).toMatchSnapshot();
});
