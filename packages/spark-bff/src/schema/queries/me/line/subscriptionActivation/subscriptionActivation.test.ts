import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import subscriptionActivationHandlerMocks from 'datasources/line/subscriptionActivationService/mocks/handlers';

beforeEach(() => {
  server.use(...subscriptionActivationHandlerMocks);
});

test('return activationUrl information for subscription activation query', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          line(lineNumber: "12345678") {
            subscriptionActivation(productInstanceId: "1-VX31189") {
              activationUrl
              lockTtl
            }
          }
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();
  expect(res.data.me.line.subscriptionActivation.activationUrl).toBe(
    'https://www.spark.co.nz/secure/myspark/getmore/?activeTab%3DSparkSport',
  );
  expect(res.data.me.line.subscriptionActivation.lockTtl).toBe(null);
});

test('return error messages for invalid params scenario', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          line(lineNumber: "999999") {
            subscriptionActivation(productInstanceId: "4001") {
              activationUrl
            }
          }
        }
      }
    `,
  });
  expect(res.errors[0].extensions.response).toMatchInlineSnapshot(`
    Object {
      "body": Object {
        "messages": Array [
          Object {
            "code": "4001",
            "message": "VAS is not ready for activation",
          },
        ],
      },
      "status": 400,
      "statusText": "Bad Request",
      "url": "http://testhost/v1/lines/999999/subscriptions/4001/activation",
    }
  `);
});

test('return lockTtl for subscription activation query', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          line(lineNumber: "888888") {
            subscriptionActivation(productInstanceId: "1-VX31189") {
              activationUrl
              lockTtl
            }
          }
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();
  expect(res.data.me.line.subscriptionActivation.activationUrl).toBe(
    'https://www.spark.co.nz/secure/myspark/getmore/?activeTab%3DSparkSport',
  );
  expect(res.data.me.line.subscriptionActivation.lockTtl).toBe(900);
});
