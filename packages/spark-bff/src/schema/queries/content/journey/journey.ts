import {
  objectType,
  queryField,
  stringArg,
  list,
  enumType,
  nullable,
} from 'nexus';
import { definitions } from 'generated/typings/contentService';

type ContentFieldType = definitions['Fields']['fieldType'];
const contentFieldType: ContentFieldType[] = [
  'HEADING',
  'SUB_HEADING',
  'PARAGRAPH',
  'LABEL',
  'IMAGE',
  'ORDERED_LIST_ITEM',
  'UNORDERED_LIST_ITEM',
  'HYPERLINK',
];

const ContentJourneyValue = enumType({
  name: 'ContentJourneyKeys',
  members: contentFieldType,
});

export const ContentJourneyDetailsResponse = objectType({
  name: 'ContentJourneyDetails',
  description: 'Content journey details to get content text info',
  definition(t) {
    t.string('key');
    t.nullable.string('value');
    t.field('type', {
      type: ContentJourneyValue,
      description: 'Content field type',
    });
    t.nullable.string('url');
  },
});

export const ContentJourneyDetailsQuery = queryField('contentJourneyDetails', {
  type: list(ContentJourneyDetailsResponse),
  args: { journeyStepId: stringArg(), variation: nullable(stringArg()) },
  description: 'Gets the content details from AEM by journey ID',
  async resolve(
    _,
    { journeyStepId, variation },
    { dataSources: { contentServiceAPI } },
  ) {
    return contentServiceAPI.getContentJourneyDetails(journeyStepId, variation);
  },
});
