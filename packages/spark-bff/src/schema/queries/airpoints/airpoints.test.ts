import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { airpointsResponseMocks } from 'datasources/airpoints/mocks/handlers';

beforeEach(() => {
  server.use(airpointsResponseMocks);
});

test('returns all the airpoints data for accountNumber', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        airpoints(accountNumber: "123456789") {
          airpointsNumber
          firstName
          lastName
          status
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.airpoints).toMatchSnapshot();
});
