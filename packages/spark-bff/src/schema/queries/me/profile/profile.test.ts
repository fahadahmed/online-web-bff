import {
  userBusinessInfoMock,
  userConsumerInfoMock,
} from 'datasources/user/userInfo/mocks/handlers';
import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';

afterEach(() => {
  server.resetHandlers();
});

const profileQuery = gql`
  query {
    me {
      profile {
        lastName
        firstName
        lastLogin
        isVerified
        businessName
        origin
        sparkID
        email
        displayName
        mfaOption
        csrTNumber
      }
    }
  }
`;

test('returns user profile Consumer', async () => {
  server.use(userConsumerInfoMock);
  const { query } = createTestClient();
  const res = await query({
    query: profileQuery,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.me.profile).toMatchInlineSnapshot(`
    Object {
      "businessName": null,
      "csrTNumber": "T816654",
      "displayName": "Jon Doe",
      "email": "jon.doe@spark.co.nz",
      "firstName": "Jon",
      "isVerified": true,
      "lastLogin": "1585027622",
      "lastName": "Doe",
      "mfaOption": "email",
      "origin": "MySpark",
      "sparkID": "SSC1555381442996828",
    }
  `);
});

test('returns user profile Business', async () => {
  server.resetHandlers(userBusinessInfoMock);
  const { query } = createTestClient();
  const res = await query({
    query: profileQuery,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.me.profile).toMatchInlineSnapshot(`
    Object {
      "businessName": "Business",
      "csrTNumber": "T816654",
      "displayName": "Business",
      "email": "jon.doe@spark.co.nz",
      "firstName": null,
      "isVerified": true,
      "lastLogin": "1585027622",
      "lastName": null,
      "mfaOption": "none",
      "origin": "MySpark",
      "sparkID": "SSC1555381442996828",
    }
  `);
});
