import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import handlers from 'datasources/marketing/profileService/mocks/handlers';

beforeEach(() => {
  server.use(...handlers);
});

test('retrieve marketing related data for analytics', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        marketingProfile {
          profileInfo {
            profileID
          }
          attributes {
            loginOption
            authState
            rememberMe
            sparkCRM {
              segment
              lineOfBusiness
              legalCategory
            }
            product {
              numberOfBroadband
              numberOfLandline
              numberOfProduct
              productTypes
            }
            access {
              numberOfAccess
              numberOfAccount
              numberOfPrepaidMobile
              numberOfPostpaidMobile
            }
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data.marketingProfile).toMatchSnapshot();
});
