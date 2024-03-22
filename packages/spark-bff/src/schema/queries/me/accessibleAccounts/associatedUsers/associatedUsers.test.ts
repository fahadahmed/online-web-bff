import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import handlers from 'datasources/user/access/mocks/handlers';

beforeEach(() => {
  server.use(...handlers);
});

test('successfully get list of account access', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          accessibleAccounts {
            associatedUsers(
              includeNotFound: false
              includeRevoked: false
              includePending: false
            ) {
              entityID
              type
              firstName
              lastName
              role
              email
            }
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "me": Object {
        "accessibleAccounts": Array [
          Object {
            "associatedUsers": Array [
              Object {
                "email": "bob.builder@toytown.com",
                "entityID": "SSC7333845957327295",
                "firstName": "Bob",
                "lastName": "Builder",
                "role": "Owner",
                "type": "GIVEN",
              },
              Object {
                "email": "robin.hood@sherwoodforest.com.uk",
                "entityID": "SSC2423456753567743",
                "firstName": "Robin",
                "lastName": "Hood",
                "role": "Manager",
                "type": "GIVEN",
              },
              Object {
                "email": "batman@arkhamcity.com",
                "entityID": "SSC9753256789688426",
                "firstName": "Bruce",
                "lastName": "Wayne",
                "role": "Manager",
                "type": "GIVEN",
              },
            ],
          },
          Object {
            "associatedUsers": Array [
              Object {
                "email": "bob.builder@toytown.com",
                "entityID": "SSC7333845957327295",
                "firstName": "Bob",
                "lastName": "Builder",
                "role": "Owner",
                "type": "GIVEN",
              },
              Object {
                "email": "robin.hood@sherwoodforest.com.uk",
                "entityID": "SSC2423456753567743",
                "firstName": "Robin",
                "lastName": "Hood",
                "role": "Manager",
                "type": "GIVEN",
              },
              Object {
                "email": "batman@arkhamcity.com",
                "entityID": "SSC9753256789688426",
                "firstName": "Bruce",
                "lastName": "Wayne",
                "role": "Manager",
                "type": "GIVEN",
              },
            ],
          },
        ],
      },
    }
  `);
});

test('failed to get list of account access', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          accessibleAccounts {
            associatedUsers(
              number: "e9001"
              includeNotFound: false
              includeRevoked: false
              includePending: false
            ) {
              entityID
              type
              firstName
              lastName
              role
              email
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
