import { createTestClient, gql } from 'test/apolloTestUtils';

test('returns all the displaySurcharge data', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        displaySurcharge(
          input: { operationTypes: [PAY_BILL, SETUP_MONTHLY_PAYMENT] }
        ) {
          surchargeValues {
            operationType
            masterCard
            visa
            amex
            dinersClub
            displayText
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.displaySurcharge).toMatchSnapshot();
});
