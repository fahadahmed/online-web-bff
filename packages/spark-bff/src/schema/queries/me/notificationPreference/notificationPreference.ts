import { objectType, stringArg, extendType, enumType } from 'nexus';

const channelTypeMembers = ['email', 'inapp', 'push', 'sms'];

const ChannelType = enumType({
  name: 'ChannelType',
  members: channelTypeMembers,
  description:
    'The type of the medium, which provides context for the medium value.',
});

export const PreferenceChannel = objectType({
  name: 'PreferenceChannel',
  description: 'Possible medium that relate to the preference.',
  definition(t) {
    t.implements('Node');
    t.string('entityID', {
      description: 'The uuid of the medium',
    });
    t.nullable.string('value', {
      description:
        'The medium value when applicable.  Not all medium types need a value.',
    });
    t.nullable.field('type', {
      type: ChannelType,
    });
    t.nullable.boolean('isActive', {
      description: 'Whether the channel is opted in.',
    });
    t.nullable.string('status');
  },
});

export const UserNotificationPreference = objectType({
  name: 'NotificationPreference',
  description: 'Topic for user preference',
  definition(t) {
    t.implements('Node');
    t.string('entityID', {
      description: 'The uuid of the preference',
    });
    t.nullable.string('line', {
      description: 'This is identifier for the line',
    });
    t.list.field('channels', {
      type: PreferenceChannel,
      description: 'Mediums /channels the preference is sent over',
    });
  },
});

export const UserPreferenceArgs = {
  topic: stringArg(),
};

export const NotificationPreference = extendType({
  type: 'User',
  definition(t) {
    t.list.nullable.field('notificationPreference', {
      type: UserNotificationPreference,
      description: 'Users preferences for a requested topic',
      args: UserPreferenceArgs,
      async resolve(_, params, { dataSources: { preferenceAPI } }) {
        const { topic } = params;
        return preferenceAPI.getNotificationPreference(topic);
      },
    });
  },
});
