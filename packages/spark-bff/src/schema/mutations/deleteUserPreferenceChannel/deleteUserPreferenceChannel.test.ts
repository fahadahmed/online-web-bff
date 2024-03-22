import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { deleteUserPreferenceChannelMock } from 'datasources/user/preference/mocks/handlers';

beforeEach(() => {
  server.use(deleteUserPreferenceChannelMock);
});

test('successfully removes existing preference channel', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        removeUserPreferenceChannel(
          input: {
            #channelType accepts for example, 'sms' or 'email'
            channelType: "sms"
            #channelValue accepts for example, '021333444'
            channelValue: "021333444"
          }
        ) {
          code
          message
          success
        }
      }
    `,
  });

  expect(res.errors).not.toBeDefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "removeUserPreferenceChannel": Object {
        "code": 2000,
        "message": "Request Processed Successfully.",
        "success": true,
      },
    }
  `);
});

test('returns validation failure when Invalid values are provided for channelType and channelValue.', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        removeUserPreferenceChannel(
          input: {
            #channelType accepts for example, 'sms' or 'email'
            channelType: "lol"
            #channelValue accepts for example, '021333444'
            channelValue: "FDG979AG80"
          }
        ) {
          code
          message
          success
        }
      }
    `,
  });

  expect(res.errors).not.toBeDefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "removeUserPreferenceChannel": Object {
        "code": 4000,
        "message": "Request validation failure.",
        "success": false,
      },
    }
  `);
});
