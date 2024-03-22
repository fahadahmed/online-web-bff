import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { updateAirpointsResponseMocks } from 'datasources/airpoints/mocks/handlers';

beforeEach(() => {
  server.use(updateAirpointsResponseMocks);
});

test('returns success for adding airpoints card number to account', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        addAirpoints(
          input: {
            accountNumber: "123456789"
            airpointsNumber: "123456789"
            firstName: "John"
            lastName: "Rambo"
            status: "Active"
          }
        ) {
          message
          code
          success
        }
      }
    `,
  });

  expect(res.errors).not.toBeDefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "addAirpoints": Object {
        "code": 2000,
        "message": "Success",
        "success": true,
      },
    }
  `);
});
