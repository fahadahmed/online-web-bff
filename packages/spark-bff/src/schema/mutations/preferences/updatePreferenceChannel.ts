import { mutationField, inputObjectType, objectType } from 'nexus';

export const UpdatePreferenceChannelInput = inputObjectType({
  name: 'UpdatePreferenceChannelInput',
  description: 'Input for adding a user preference channel',
  definition(t) {
    t.nullable.string('authCode', {
      description: 'Creating some channels email / sms requires authcode.',
    });
    t.nullable.string('address', {
      description:
        'The address of the channel type. The value of the address varies based on the address type. For in_app and push channels, no value is required. ',
    });
    t.nullable.string('channelId');

    t.nullable.field('channelType', {
      type: 'ChannelType',
      description: 'The channel for the notification channel',
    });
    t.nullable.boolean('isOptedIn');
    t.nullable.string('preferenceId');
    t.nullable.string('status');
  },
});

export const UpdatePreferenceChannelResponse = objectType({
  name: 'UpdatePreferenceChannelResponse',
  definition(t) {
    t.implements('GenericMutationResponse');
    t.nullable.field('channelPreference', { type: 'PreferenceChannel' });
  },
});

export const updatePreferenceChannel = mutationField(
  'updatePreferenceChannel',
  {
    type: 'UpdatePreferenceChannelResponse',
    description:
      'Updates an existing channel preference if its exists, otherwise it will create a new channel preference.',
    args: { input: UpdatePreferenceChannelInput },
    async resolve(_, params, { dataSources: { preferenceAPI } }) {
      const { input } = params;
      return preferenceAPI.updatePreferenceChannel(input);
    },
  },
);
