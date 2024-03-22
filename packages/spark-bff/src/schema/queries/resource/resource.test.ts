import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import handlers from 'datasources/utility/resource/mocks/handlers';

beforeEach(() => {
  server.use(...handlers);
});

test('a postpaid line number, returns account and line access information', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        resource(resourceId: "02108672038") {
          isNumberIdentified
          line {
            lineType
            isLineAccessAllowed
          }
          account {
            isPasswordProtected
            isAccountAccessAllowed
            hasBusinessName
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.resource).toMatchSnapshot();
});

test('a prepaid line number, returns line access information', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        resource(resourceId: "0278149915") {
          isNumberIdentified
          line {
            lineType
            isLineAccessAllowed
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.resource).toMatchSnapshot();
});

test('a broadband line number, returns line access information ', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        resource(resourceId: "033478552") {
          isNumberIdentified
          line {
            lineType
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.resource).toMatchSnapshot();
});
