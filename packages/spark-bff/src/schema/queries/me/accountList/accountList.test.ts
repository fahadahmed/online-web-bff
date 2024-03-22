import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import {
  accountListHandler,
  guestAccountListHandler,
  unauthorizedAccountListHandler,
} from 'datasources/customer/accountsService/mocks/handlers';

beforeEach(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.clearAllTimers();
});

test('Get a simple list of accounts and related product information', async () => {
  server.use(accountListHandler);
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query AccountList {
        me {
          accountList {
            accountNumber
            accountId
            customerNumber
            customerSegment
            segment
            balanceManagement
            status
            firstName
            lastName
            inCollections
            products {
              lineNumber
              assetId
              offerId
              offerName
              productInstanceId
              ifpEligible
            }
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.me).toMatchSnapshot();
});

test('accountList query returns an empty list when unauthenticated', async () => {
  server.use(unauthorizedAccountListHandler);
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query AccountList {
        me {
          accountList {
            accountNumber
            accountId
            customerNumber
            customerSegment
            balanceManagement
            status
            firstName
            lastName
            inCollections
            products {
              lineNumber
              assetId
              offerId
              offerName
              productInstanceId
              ifpEligible
            }
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.me).toMatchSnapshot();
});

test('accountList query returns an empty list when guest', async () => {
  server.use(guestAccountListHandler);
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query AccountList {
        me {
          accountList {
            accountNumber
            accountId
            customerNumber
            customerSegment
            balanceManagement
            status
            firstName
            lastName
            inCollections
            products {
              lineNumber
              assetId
              offerId
              offerName
              productInstanceId
              ifpEligible
            }
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.me).toMatchSnapshot();
});
