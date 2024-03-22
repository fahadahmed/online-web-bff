import { createTestClient, gql } from 'test/apolloTestUtils';
import { server as mockServer } from 'test/server';
import { getAvailableNumbersMock } from 'datasources/shop/availableNumbers/mocks/handlers';

beforeEach(() => {
  mockServer.use(getAvailableNumbersMock);
});

test('returns first set of available numbers', async () => {
  const { query } = createTestClient();

  const res = await query({
    query: gql`
      query {
        availableNumbers(reservationId: "RE_20210603_008346474") {
          code
          success
          message
          lineNumbers
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();
  expect(res.data!.availableNumbers).toMatchSnapshot();
});
