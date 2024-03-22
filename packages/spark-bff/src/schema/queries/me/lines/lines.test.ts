import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import handlers from 'datasources/user/access/mocks/handlers';

beforeEach(() => {
  server.use(...handlers);
});

test('returns lines that the user has access to', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          lines(accessLevel: LINE_LEVEL) {
            displayName
            lineNumber
            associatedUsers {
              ...userInfo
            }
          }
        }
      }
      fragment userInfo on AssociatedUser {
        email
        role
        firstName
        lastName
        businessName
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.me.lines).toMatchSnapshot();
});

test('returns lines that the user has access to when accessLevel is passed', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          lines(accessLevel: LINE_LEVEL) {
            lineNumber
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.me.lines).toMatchSnapshot();
});
