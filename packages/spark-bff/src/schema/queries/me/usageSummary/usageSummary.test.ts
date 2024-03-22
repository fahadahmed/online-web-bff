import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import accessMocks from 'datasources/user/access/mocks/handlers';
import usageMocks from 'datasources/line/usage/mocks/handlers';

beforeEach(() => {
  server.use(...accessMocks, ...usageMocks);
});

test('returns usage summary for list of lines ', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          usageSummary {
            lineNumber
            groupProfile
            displayName
            messagePrimary
            messageSecondary
            messageTertiary
            messageStatus
            productIcon
            topUpBuyExtra
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.me.usageSummary).toMatchSnapshot();
});
