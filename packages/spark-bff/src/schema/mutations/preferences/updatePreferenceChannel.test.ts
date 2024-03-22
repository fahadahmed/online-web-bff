import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import {
  addUserPreferenceChannelMock,
  updateUserPreferenceMock,
} from 'datasources/user/preference/mocks/handlers';

beforeEach(() => {
  server.use(updateUserPreferenceMock, addUserPreferenceChannelMock);
});

test('turn user preference on successfully ', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        updatePreferenceChannel(
          input: {
            preferenceId: "preferenceID"
            channelId: "successExampleId"
            channelType: inapp
            isOptedIn: true
          }
        ) {
          success
          message
          code
          channelPreference {
            id
            entityID
            value
            type
            isActive
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "updatePreferenceChannel": Object {
        "channelPreference": Object {
          "entityID": "successExampleId",
          "id": "UHJlZmVyZW5jZUNoYW5uZWw6c3VjY2Vzc0V4YW1wbGVJZA==",
          "isActive": true,
          "type": "inapp",
          "value": null,
        },
        "code": 2011,
        "message": "The preference was successfully updated.",
        "success": true,
      },
    }
  `);
});

test('turn user preference off, fails in core preference center ', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        updatePreferenceChannel(
          input: {
            preferenceId: "preferenceID"
            channelId: "failureExampleId"
            channelType: push
            isOptedIn: false
          }
        ) {
          success
          message
          code
          channelPreference {
            id
            entityID
            value
            type
            isActive
          }
        }
      }
    `,
  });

  expect(res.errors).not.toBeDefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "updatePreferenceChannel": Object {
        "channelPreference": null,
        "code": 4011,
        "message": "Preference centre returned an error and failed to persist the preference.",
        "success": false,
      },
    }
  `);
});

test('add a preference successfully push, without auth code', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        updatePreferenceChannel(
          input: {
            preferenceId: "preferenceId"
            channelType: push
            isOptedIn: true
          }
        ) {
          success
          message
          code
          channelPreference {
            id
            entityID
            value
            type
            isActive
          }
        }
      }
    `,
  });

  expect(res.errors).not.toBeDefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "updatePreferenceChannel": Object {
        "channelPreference": Object {
          "entityID": "1b5-9612-4eba-b42d",
          "id": "UHJlZmVyZW5jZUNoYW5uZWw6MWI1LTk2MTItNGViYS1iNDJk",
          "isActive": true,
          "type": "push",
          "value": null,
        },
        "code": 2011,
        "message": "The channel was successfully created.",
        "success": true,
      },
    }
  `);
});

test('add a preference successfully, with auth code', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        updatePreferenceChannel(
          input: {
            preferenceId: "preferenceId"
            channelType: sms
            isOptedIn: true
            address: "1234567"
            authCode: "989898"
          }
        ) {
          success
          message
          code
          channelPreference {
            id
            entityID
            value
            type
            isActive
          }
        }
      }
    `,
  });

  expect(res.errors).not.toBeDefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "updatePreferenceChannel": Object {
        "channelPreference": Object {
          "entityID": "1b5-9612-4eba-b42d",
          "id": "UHJlZmVyZW5jZUNoYW5uZWw6MWI1LTk2MTItNGViYS1iNDJk",
          "isActive": true,
          "type": "sms",
          "value": "1234567",
        },
        "code": 2011,
        "message": "The channel was successfully created.",
        "success": true,
      },
    }
  `);
});

test('add a email / sms preference without auth code, should return 2012 error code', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        updatePreferenceChannel(
          input: {
            preferenceId: "preferenceId"
            channelType: sms
            isOptedIn: true
            address: "1234567"
          }
        ) {
          success
          message
          code
          channelPreference {
            id
            entityID
            value
            type
            isActive
          }
        }
      }
    `,
  });

  expect(res.errors).not.toBeDefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "updatePreferenceChannel": Object {
        "channelPreference": null,
        "code": 2012,
        "message": "Auth code not passed for email or sms, auth code generated.  Channel not created.",
        "success": true,
      },
    }
  `);
});
