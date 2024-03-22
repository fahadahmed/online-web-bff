import { preferenceTopicsMock } from 'datasources/user/preference/mocks/handlers';
import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';

beforeEach(() => {
  server.use(preferenceTopicsMock);
});

test('returns all topics if group is not passed', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          preferenceTopics {
            entityID
            name
            description
            subtopics {
              entityID
              name
              description
            }
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.me.preferenceTopics).toMatchInlineSnapshot(`
    Array [
      Object {
        "description": "Usage description",
        "entityID": "1b5-9612-4eba-b42d",
        "name": "Usage",
        "subtopics": Array [
          Object {
            "description": "Blah blah blah",
            "entityID": "hj5a-b42d-92f09cad6",
            "name": "Mobile",
          },
          Object {
            "description": "Broadband description",
            "entityID": "ghsa34-3y3b3-jn4haj98z",
            "name": "Broadband",
          },
        ],
      },
      Object {
        "description": "Privacy related preferences",
        "entityID": "bf5sa34-121b3-jn4h",
        "name": "Privacy",
        "subtopics": null,
      },
    ]
  `);
});

test('returns only notifications related topics if group "notification" is passed', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          preferenceTopics(group: "notification") {
            entityID
            name
            description
          }
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();
  expect(res.data!.me.preferenceTopics).toMatchInlineSnapshot(`
    Array [
      Object {
        "description": "",
        "entityID": "1b5-9612-4eba-b42d",
        "name": "Usage",
      },
      Object {
        "description": "Manage your pack and extra renewals",
        "entityID": "abccd-3y3b3-jn4haj920",
        "name": "Product renewal",
      },
      Object {
        "description": "Reminders to pay or topup",
        "entityID": "abccd-3y3b3-jn4haj98z",
        "name": "Billing & Prepaid balance",
      },
      Object {
        "description": null,
        "entityID": "abccd-3y3b3-jn4haj879",
        "name": "Marketing preferences",
      },
      Object {
        "description": null,
        "entityID": "dbccd-3y3b3-jn4haj980",
        "name": "Order updates",
      },
      Object {
        "description": null,
        "entityID": "ebccd-3y3b3-jn4haj191",
        "name": "Support updates",
      },
    ]
  `);
});

test('returns an error is the group is not found', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          preferenceTopics(group: "invalid") {
            entityID
            name
            description
          }
        }
      }
    `,
  });
  expect(res.errors).toBeDefined();
  expect(res.errors).toMatchInlineSnapshot(`
    Array [
      [GraphQLError: 404: Not Found],
    ]
  `);
});
