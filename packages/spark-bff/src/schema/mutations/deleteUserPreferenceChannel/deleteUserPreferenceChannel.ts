import { objectType, inputObjectType, mutationField } from 'nexus';

export const DeleteUserPreferenceChannelResponse = objectType({
  name: 'DeleteUserPreferenceChannelResponse',
  description:
    'object to hold fields for response when removing a preference channel for a given user.',
  definition(t) {
    t.implements('GenericMutationResponse');
  },
});

export const DeleteUserPreferenceChannelInput = inputObjectType({
  name: 'DeleteUserPreferenceChannelInput',
  description:
    'input object having fields for removing existing user preference channel.',
  definition(t) {
    t.string('channelType', {
      description:
        'The preference channel type to be removed for the given user, eg. email or sms.',
    });
    t.string('channelValue', {
      description:
        'The channel value for this preference, eg. 02765432. When combined with channel Type, creates a unique identifier for this preference channel.',
    });
  },
});

export const DeleteUserPreferenceChannel = mutationField(
  'removeUserPreferenceChannel',
  {
    type: DeleteUserPreferenceChannelResponse,
    description: 'Removes a preference channel for a given user.',
    args: { input: DeleteUserPreferenceChannelInput },
    resolve(_, { input }, { dataSources: { preferenceAPI } }) {
      return preferenceAPI.removeUserPreferenceChannel(input);
    },
  },
);
