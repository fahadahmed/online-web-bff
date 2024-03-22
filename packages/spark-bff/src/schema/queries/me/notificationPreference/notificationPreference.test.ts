import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { userNotificationPreferenceMock } from 'datasources/user/preference/mocks/handlers';

beforeEach(() => {
  server.use(userNotificationPreferenceMock);
});

test('returns notification preference for Mobile usage', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          notificationPreference(topic: "mobile-ewHmbp095-v") {
            id
            entityID
            line
            channels {
              entityID
              value
              isActive
              type
            }
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.me.notificationPreference).toMatchSnapshot();
});

test('returns notification preference for Broadband usage', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          notificationPreference(topic: "broadband-asdgas87-iv") {
            id
            entityID
            line
            channels {
              entityID
              value
              isActive
              type
            }
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.me.notificationPreference).toMatchInlineSnapshot(`
    Array [
      Object {
        "channels": Array [
          Object {
            "entityID": "bu3-jn4ha",
            "isActive": true,
            "type": "email",
            "value": "bob.builder@toyworld.com",
          },
          Object {
            "entityID": "bu4-jn4ha",
            "isActive": true,
            "type": "sms",
            "value": "0277320153",
          },
          Object {
            "entityID": "",
            "isActive": false,
            "type": "inapp",
            "value": "",
          },
          Object {
            "entityID": "",
            "isActive": false,
            "type": "push",
            "value": "",
          },
        ],
        "entityID": "acd-9612-4eba-b412",
        "id": "Tm90aWZpY2F0aW9uUHJlZmVyZW5jZTpIb21lIGJyb2FkYmFuZA==",
        "line": "Home broadband",
      },
    ]
  `);
});

test('returns error when Topic name is not found', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          notificationPreference(topic: "1234-56789-0") {
            id
            entityID
            line
            channels {
              entityID
              value
              isActive
              type
            }
          }
        }
      }
    `,
  });

  expect(res.errors).toBeDefined();
  expect(res.errors).toMatchInlineSnapshot(`
    Array [
      [GraphQLError: 500: Internal Server Error],
    ]
  `);
});
