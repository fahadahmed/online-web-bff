import { extendType, nullable, objectType, stringArg } from 'nexus';

export const PreferenceTopic = objectType({
  name: 'PreferenceTopic',
  description: 'Topic for user preference',
  definition(t) {
    t.string('entityID', {
      description: 'The uuid of the topic',
    });
    t.string('name', {
      description: 'The name of the topic (or sub-topic)',
    });
    t.nullable.string('description', {
      description:
        'A description for the topic from the notification preference centre',
    });
    t.string('group', {
      description:
        'This specifics the group of topics which should be retrieved.',
    });
    t.nullable.list.field('subtopics', {
      description: 'Subtopics for topic',
      type: PreferenceTopic,
      async resolve(parent, _, { dataSources: { preferenceAPI } }) {
        const { entityID, group } = parent;

        return preferenceAPI.getSubtopics(entityID, group);
      },
    });
  },
});

export const PreferenceTopicArgs = { group: nullable(stringArg()) };

export const PreferenceTopics = extendType({
  type: 'User',
  definition(t) {
    t.list.field('preferenceTopics', {
      type: PreferenceTopic,
      description:
        'Topics which are eligible/available for users to set preference',
      args: PreferenceTopicArgs,
      async resolve(_, params, { dataSources: { preferenceAPI } }) {
        const { group } = params;
        return preferenceAPI.getAvailableRootTopics(group);
      },
    });
  },
});
