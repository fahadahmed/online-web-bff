import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import handlers from 'datasources/location/pointOfInterest/outagesPointOfInterest/mocks/handlers';

beforeEach(() => {
  server.use(...handlers);
});

test('retrieve a list of outages affecting services for INTERNET', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        location {
          outages(serviceAffected: INTERNET) {
            displayName
            outageType
            category
            serviceAffected
            status
            description
            longitude
            latitude
            startDateTime
            endDateTime
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data.location).toMatchSnapshot();
});

test('retrieve a list of outages affecting services for INTERNET of type MAINTENANCE', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        location {
          outages(outageType: MAINTENANCE, serviceAffected: INTERNET) {
            displayName
            outageType
            category
            serviceAffected
            status
            description
            longitude
            latitude
            startDateTime
            endDateTime
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data.location).toMatchSnapshot();
});

test('retrieve a list of outages affecting services for INTERNET of type OUTAGE', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        location {
          outages(outageType: OUTAGE, serviceAffected: INTERNET) {
            displayName
            outageType
            category
            serviceAffected
            status
            description
            longitude
            latitude
            startDateTime
            endDateTime
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data.location).toMatchSnapshot();
});

test('retrieve a list of outages affecting services for LANDLINE', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        location {
          outages(serviceAffected: LANDLINE) {
            displayName
            outageType
            category
            serviceAffected
            status
            description
            longitude
            latitude
            startDateTime
            endDateTime
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data.location).toMatchSnapshot();
});

test('retrieve a list of outages affecting services for MOBILE', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        location {
          outages(serviceAffected: MOBILE) {
            displayName
            outageType
            category
            serviceAffected
            status
            description
            longitude
            latitude
            startDateTime
            endDateTime
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data.location).toMatchSnapshot();
});

test('retrieve a list of outages affecting services for OTHERS', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        location {
          outages(serviceAffected: OTHERS) {
            displayName
            outageType
            category
            serviceAffected
            status
            description
            longitude
            latitude
            startDateTime
            endDateTime
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data.location).toMatchSnapshot();
});
