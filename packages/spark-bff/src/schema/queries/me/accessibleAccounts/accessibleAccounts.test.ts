import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import handlers from 'datasources/user/access/mocks/handlers';

test('returns active accounts when status is Active', async () => {
  server.use(...handlers);
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          activeAccounts: accounts(status: Active) {
            displayName
            accountNumber
            balanceManagement
            lines {
              ...lineInfo
            }
            associatedUsers {
              ...userInfo
            }
          }
        }
      }
      fragment lineInfo on Line {
        displayName
        lineNumber
        associatedUsers {
          ...userInfo
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
  expect(res.data!.me).toMatchSnapshot();
});

test('returns active accounts when status is Active', async () => {
  server.use(...handlers);
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          activeAccounts: accessibleAccounts(status: Active) {
            displayName
            accountNumber
            balanceManagement
            lines {
              ...lineInfo
            }
            associatedUsers {
              ...userInfo
            }
          }
        }
      }
      fragment lineInfo on Line {
        displayName
        lineNumber
        associatedUsers {
          ...userInfo
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
  expect(res.data!.me).toMatchSnapshot();
});

test('returns all accounts when no status is passed', async () => {
  server.use(...handlers);
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          accessibleAccounts {
            accountNumber
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.me).toMatchSnapshot();
});
