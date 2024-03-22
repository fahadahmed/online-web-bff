import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import handlers, {
  subscriptionOfferWhenNoLineAccessHandler,
  unhandledErrorSubscriptionsHandler,
} from 'datasources/line/lineSubscriptionsService/mocks/handlers';

test('Returns summary of subscription component offers for a given SparkId. Does not include billing information or CTAs.', async () => {
  server.use(...handlers);

  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          subscriptions {
            offer {
              offerId
              name
              productInstanceId
            }
            bundleOffer {
              bundleOfferId
              name
              productInstanceId
            }
            assetStartDate
            accountNumber
            lineNumber
            status {
              type
              label
            }
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.me.subscriptions).toMatchSnapshot();
});

test('Returns empty list when there is no line access.', async () => {
  server.use(...[subscriptionOfferWhenNoLineAccessHandler]);

  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          subscriptions {
            offer {
              offerId
              name
              productInstanceId
            }
            bundleOffer {
              bundleOfferId
              name
              productInstanceId
            }
            assetStartDate
            accountNumber
            lineNumber
            status {
              type
              label
            }
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.me.subscriptions).toMatchSnapshot();
});

test('Throws error when unsupported error code is returned.', async () => {
  server.use(...[unhandledErrorSubscriptionsHandler]);
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          subscriptions {
            offer {
              offerId
              name
              productInstanceId
            }
            bundleOffer {
              bundleOfferId
              name
              productInstanceId
            }
            assetStartDate
            accountNumber
            lineNumber
            status {
              type
              label
            }
          }
        }
      }
    `,
  });

  expect(res.errors).not.toBeUndefined();
});
