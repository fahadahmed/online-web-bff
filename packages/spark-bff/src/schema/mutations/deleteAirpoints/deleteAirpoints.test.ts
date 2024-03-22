import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { updateAirpointsResponseMocks } from 'datasources/airpoints/mocks/handlers';

beforeEach(() => {
  server.use(updateAirpointsResponseMocks);
});

test('returns success for deleting airpoints card number to account', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        deleteAirpoints(
          input: { accountNumber: "123456789", status: "Inactive" }
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
      "deleteAirpoints": Object {
        "code": 2000,
        "message": "Success",
        "success": true,
      },
    }
  `);
});
