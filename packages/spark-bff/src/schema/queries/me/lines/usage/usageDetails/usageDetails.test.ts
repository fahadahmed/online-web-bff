import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import accessMocks from 'datasources/user/access/mocks/handlers';
import usageDetailsMocks from 'datasources/line/usage/usageDetailsService/mocks';
import lineSummaryMocks from 'datasources/line/lineSummary/mocks/handlers';

beforeEach(() => {
  server.use(...accessMocks, ...usageDetailsMocks, ...lineSummaryMocks);
});

test('returns all the Usage Details for line Number of line ', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          line(lineNumber: "033227715") {
            lineNumber
            serviceType
            balanceManagement
            groupID
            groupProfile
            groupCapValue
            groupCapUnit
            usages {
              priority
              category
              productName
              billingStatus
              name
              uncapped
              types
              cap {
                unit
                value
              }
              used {
                unit
                value
                bySharer
              }
              remaining {
                unit
                value
              }
              expiry {
                date
                value
                unit
              }
              nextRenewalDate
              roaming
              rolloverData {
                value
                unit
              }
              rolloverExpiry {
                date
                value
                unit
              }
            }
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.me.line).toMatchSnapshot();
});

test('returns value should be null for unKnown line number in lines ', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          line(lineNumber: "000000") {
            lineNumber
            serviceType
            balanceManagement
            groupID
            groupProfile
            usages {
              priority
              category
              productName
              billingStatus
              name
              uncapped
              cap {
                unit
                value
              }
              used {
                unit
                value
                bySharer
              }
              remaining {
                unit
                value
              }
              expiry {
                date
                value
                unit
              }
              nextRenewalDate
              roaming
              rolloverData {
                value
                unit
              }
              rolloverExpiry {
                date
                value
                unit
              }
            }
          }
        }
      }
    `,
  });

  expect(res.data).toBeNull();
});
