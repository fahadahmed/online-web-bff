import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { getCheckoutDataHandler } from 'datasources/shop/checkout/mocks/handlers';
import db from 'datasources/shop/checkout/mocks/db';

beforeEach(() => {
  server.use(getCheckoutDataHandler);
  db.addSection({
    cartId: 'fake-cart-id',
    sectionId: 'fake-section-id',
    steps: [
      {
        fields: [
          { name: 'chooseNumber', value: 'Select a new number' },
          { name: 'phoneNumbers', value: '0272060803' },
          { name: 'chooseSIMType', value: 'eSIM' },
        ],
        options: [
          {
            name: 'chooseNumber',

            fields: [
              { name: 'chooseNumber', value: 'Select a new number' },
              { name: 'phoneNumbers', value: '0272060803' },
              { name: 'chooseSIMType', value: 'eSIM' },
            ],
          },
        ],
        sequence: '0',
        stepId: 'fake-step-id',
        offerContainerId: null,
      },
    ],
  });
});

afterAll(() => {
  db.clearDB();
});

test('successfully retrieves the saved checkout form fields and value of queried step', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        checkoutData(input: { cartId: "fake-cart-id", channel: personalshop }) {
          id
          sections {
            steps {
              entries {
                name
                value
              }
              offerContainerId
              stepId
              stepPath
            }
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.checkoutData).toMatchSnapshot();
});
