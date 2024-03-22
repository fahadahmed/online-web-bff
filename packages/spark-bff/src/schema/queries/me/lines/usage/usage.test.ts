import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import accessMocks from 'datasources/user/access/mocks/handlers';
import usageMocks from 'datasources/line/usage/mocks/handlers';

beforeEach(() => {
  server.use(...accessMocks, ...usageMocks);
});

test('returns usage summary for a line ', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          line(lineNumber: "0276404520") {
            usageSummary {
              lineNumber
              groupProfile
              messagePrimary
              messageSecondary
              messageTertiary
              messageStatus
              productIcon
              topUpBuyExtra
            }
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.me.line).toMatchSnapshot();
});

test('return null on non-exist line number ', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          line(lineNumber: "033227717") {
            groupProfile
            usageSummary {
              messagePrimary
              messageSecondary
              messageTertiary
              messageStatus
              productIcon
              topUpBuyExtra
            }
          }
        }
      }
    `,
  });

  expect(res.data!.me.line).toMatchSnapshot();
});
