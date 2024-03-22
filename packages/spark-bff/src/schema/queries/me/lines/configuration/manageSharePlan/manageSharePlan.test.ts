import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { getGroupCapsMock } from 'datasources/line/lineConfiguration/mocks/handlers';
import accessMocks from 'datasources/user/access/mocks/handlers';

beforeEach(() => {
  server.use(getGroupCapsMock, ...accessMocks);
});

test('returns all the Group items for line Number of line ', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        me {
          line(lineNumber: "033227715") {
            group {
              id
              name
              totalData {
                value
                unit
              }
              members {
                serviceId
                type
                status
                isUncapped
                capValue
                usedValue
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
