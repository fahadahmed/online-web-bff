import { getCheckoutStructureHandler } from 'datasources/shop/checkout/mocks/handlers';
import { createTestClient, gql } from 'test/apolloTestUtils';
import { server as mockServer } from 'test/server';

beforeEach(() => {
  mockServer.use(getCheckoutStructureHandler);
});

test('checkoutStructure query returns correct data and no errors', async () => {
  const { query } = createTestClient();

  const res = await query({
    query: gql`
      query CheckoutFormQuery($cartId: String!) {
        checkoutStructure(cartId: $cartId, channel: personalss) {
          sections {
            sectionId
            name
            steps {
              stepId
              name
              fields {
                dataRef {
                  id
                  text
                }
                name
                fieldType
                filterDate
                key
                label
                visibilityExpression
                minimumRule {
                  expression
                  message
                }
                maximumRule {
                  expression
                  message
                }
                options {
                  value
                  sublabel
                  visibility
                }
                parent {
                  key
                  name
                  value
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      cartId: 'fake-cart-id',
    },
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.checkoutStructure).toMatchSnapshot();
});
