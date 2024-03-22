import { server } from 'test/server';
import lineDetailsMockHandlers from 'datasources/line/lineDetails/mocks/handlers';
import { createTestClient, gql } from 'test/apolloTestUtils';

beforeEach(() => {
  server.use(...lineDetailsMockHandlers);
});

test('returns allowances from a given line number', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          line(lineNumber: "1234567") {
            allowances {
              dataStackAllowances {
                capLimit
              }
              entitlements {
                description
                detailedDescription
                displayPriority
                id
                name
                quantity
                subtype
                throttleMessage
                unlimited
                usageType
                entitlementQuantityUnit
              }
              extras {
                allowedCount
                availableCount
                billingFrequencyCode
                billingFrequencyName
                contractRenewalType
                contractTermFrequency
                contractTermNumber
                countries {
                  name
                }
                displayPriority
                entitlements {
                  description
                }
                renewable
                offerId
                periodEndDate
                prepaidBasePlanValuePack
                price
                priceType
                productId
                productInstanceId
                productName
                renewalFrequency
                renewalState
                status
                subscriptionTermName
                subtype
                type
                usageType
              }
              rolloverDetails {
                rolloverAllowances {
                  remainingAmount
                }
              }
              sharePlanDetails {
                groupId
              }
              speedAllowances {
                status
              }
            }
          }
        }
      }
    `,
  });
  expect(res.errors).toBeUndefined();
  expect(res.data!.me.line.allowances).toMatchSnapshot();
});
