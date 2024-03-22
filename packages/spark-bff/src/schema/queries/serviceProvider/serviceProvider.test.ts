import networkSettingsHandlers from 'datasources/technology/networkSettingsService/mocks/handlers';
import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';

test('serviceProvider query returns correct service provider with no errors', async () => {
  server.use(...networkSettingsHandlers);

  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query ServiceProviderQuery($lineNumber: String!) {
        serviceProvider(lineNumber: $lineNumber) {
          serviceProviderId
          name
        }
      }
    `,
    variables: {
      lineNumber: '021123456',
    },
  });

  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "serviceProvider": Object {
        "name": "Vodafone",
        "serviceProviderId": "5",
      },
    }
  `);
});

test('serviceProvider query returns errors when could not match', async () => {
  server.use(...networkSettingsHandlers);

  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query ServiceProviderQuery($lineNumber: String!) {
        serviceProvider(lineNumber: $lineNumber) {
          serviceProviderId
          name
        }
      }
    `,
    variables: {
      lineNumber: 'not-a-phone-number',
    },
  });

  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "serviceProvider": null,
    }
  `);
});
