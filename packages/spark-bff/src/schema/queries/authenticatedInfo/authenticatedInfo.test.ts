import {
  internalServerErrorUserInfoMock,
  userConsumerInfoMock,
  unauthenticatedUserInfoMock,
} from 'datasources/user/userInfo/mocks/handlers';
import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';

afterEach(() => {
  server.resetHandlers();
});

const authenticatedInfoQuery = gql`
  query {
    authenticatedInfo {
      isLoggedIn
      isGuest
      hasSparkId
      profile {
        lastName
        firstName
        lastLogin
        isVerified
        origin
        sparkID
      }
    }
  }
`;

test('returns userprofile and login status if user is authenticated', async () => {
  server.use(userConsumerInfoMock);
  const { query } = createTestClient();
  const res = await query({
    query: authenticatedInfoQuery,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.authenticatedInfo).toMatchInlineSnapshot(`
    Object {
      "hasSparkId": true,
      "isGuest": false,
      "isLoggedIn": true,
      "profile": Object {
        "firstName": "Jon",
        "isVerified": true,
        "lastLogin": "1585027622",
        "lastName": "Doe",
        "origin": "MySpark",
        "sparkID": "SSC1555381442996828",
      },
    }
  `);
});

test('returns no profile and login status false, if user is unauthenticated', async () => {
  server.resetHandlers(unauthenticatedUserInfoMock);
  const { query } = createTestClient();
  const res = await query({
    query: authenticatedInfoQuery,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.authenticatedInfo).toMatchInlineSnapshot(`
    Object {
      "hasSparkId": false,
      "isGuest": false,
      "isLoggedIn": false,
      "profile": null,
    }
  `);
});

test('BFF returns 500 error for DESL internal server error', async () => {
  server.resetHandlers(internalServerErrorUserInfoMock);
  const { query } = createTestClient();
  const res = await query({
    query: authenticatedInfoQuery,
  });

  expect(res.errors).toMatchInlineSnapshot(`
    Array [
      [GraphQLError: 500: Internal Server Error],
    ]
  `);
  expect(res.data).toBeNull();
});
