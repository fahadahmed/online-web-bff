import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import handlers from 'datasources/location/address/mocks/handlers';

beforeEach(() => {
  server.use(...handlers);
});

test('returns address suggestions for a valid partial address', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        location {
          address {
            suggestions(partialAddress: "5 ") {
              elid
              label
            }
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data.location).toMatchSnapshot();
});

test('returns address details for a valid elid', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        location {
          address {
            detail(elid: "302922546") {
              elid
              addressLine1
              addressLine2
              addressLine3
              addressLine3
              addressLine4
              latitude
              longitude
            }
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data.location.address.detail).toMatchSnapshot();
});
