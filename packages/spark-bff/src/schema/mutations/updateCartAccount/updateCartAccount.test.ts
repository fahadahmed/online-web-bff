import context from 'context';
import { updateCartAccountMock } from 'datasources/shop/cart/mocks/handlers';
import { createTestClient, gql } from 'test/apolloTestUtils';
import { server as mockServer } from 'test/server';

jest.mock('context');

beforeEach(() => {
  mockServer.use(updateCartAccountMock);
});

test('updateCartAccount returns full cart respone', async () => {
  const { mutate } = createTestClient();

  const mockSetHeader = jest.fn();
  (context as jest.Mock).mockReturnValue({
    res: { setHeader: mockSetHeader },
    loggerMeta: {
      sourceIP: '',
      userID: '',
      clientName: '',
      sessionID: '',
      transactionID: '',
    },
  });

  const res = await mutate({
    mutation: gql`
      mutation UpdateCartAccountMutation {
        updateCartAccount(
          accountNumber: "test-account-number"
          cartId: "test-cart-id"
          channel: personalshop
        ) {
          accountNumber
          auth {
            isAuthenticated
            isGuest
          }
          bundles {
            bundleId
            categoryId
            filteredItems(actions: [add, delete]) {
              itemId
              title
            }
            isLineNumberRequired
            items {
              description
              isIncluded
              shouldHide
              imageUrl
              itemId
              productOfferingId
              title
              action
              quantity
              billingFrequency
              frequencyType
              frequencyPeriod
              frequencyValue
              dealText
              contractTerm {
                name
                description
                value
                unit
              }
              basePrice {
                taxExclusiveValue
                value
              }
              effectivePrice {
                taxExclusiveValue
                value
              }
              discountPrice {
                taxExclusiveValue
                value
              }
              offerId
              categories
              balanceManagement
              removable
            }
            lineNumber
            offerIds
          }
          cartId
          isAccountNumberRequired
          shippableItems {
            description
            imageUrl
            itemId
            quantity
            title
          }
          summaries {
            billingFrequency
            frequencyType
            frequencyPeriod
            frequencyValue
            subtotal
            taxExclusiveSubtotal
            total
            taxExclusiveTotal
            discount
            taxExclusiveDiscount
            gst
          }
        }
      }
    `,
  });

  expect(res.errors).not.toBeDefined();
  expect(res.data).toMatchSnapshot();
});
