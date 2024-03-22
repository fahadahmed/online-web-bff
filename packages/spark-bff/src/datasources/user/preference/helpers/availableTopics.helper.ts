import { definitions } from 'generated/typings/userPreferencesProxy';
import { NexusGenRootTypes } from 'generated/nexusTypes';

const reduceTopic = (
  topic: definitions['Topic'],
  group: string,
): NexusGenRootTypes['PreferenceTopic'] => {
  return {
    entityID: topic.id,
    name: topic.name,
    description: topic.description,
    group,
  };
};

export const getRootTopics = (
  topics: definitions['Topic'][],
  group: string,
): NexusGenRootTypes['PreferenceTopic'][] => {
  return topics
    .filter((topic) => {
      return topic.root === '';
    })
    .map((topic) => reduceTopic(topic, group));
};

export const getSubtopicsByTopic = (
  topicID: string,
  topics: definitions['Topic'][],
  group: string,
): NexusGenRootTypes['PreferenceTopic'][] => {
  const subtopics = topics.filter((topic) => {
    return topic.parent === topicID;
  });

  if (subtopics.length === 0) {
    return null;
  }
  return subtopics.map((topic) => reduceTopic(topic, group));
};
