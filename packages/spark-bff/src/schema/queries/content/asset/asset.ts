import { objectType, enumType, queryField, stringArg } from 'nexus';
import { operations, definitions } from 'generated/typings/contentService';

type FormatType = definitions['Content']['format'];
const formatTypes: FormatType[] = [
  'png',
  'gif',
  'jpg',
  'zip',
  'pdf',
  'mp4',
  'text',
  'cta',
];

export const ContentFormatType = enumType({
  name: 'ContentFormatType',
  members: formatTypes,
});

type AssetType = operations['getAssetsV2']['parameters']['query']['type'];
const assetTypes: AssetType[] = [
  'Image',
  'Icon',
  'Document',
  'Video',
  'TextContent',
  'CTA',
];

export const AssetType = enumType({
  name: 'AssetType',
  members: assetTypes,
});

type ContentType = definitions['Content']['type'];
const contentTypes: ContentType[] = ['heading', 'cta', 'paragraph'];

export const ContentType = enumType({
  name: 'ContentType',
  members: contentTypes,
});

export const ContentDetails = objectType({
  name: 'ContentDetails',
  description: 'object to hold fields for summary and detail messages',
  definition(t) {
    t.field('assetType', {
      type: AssetType,
      description: 'asset type',
    });
    t.field('format', {
      type: ContentFormatType,
      description: 'format of content',
    });
    t.nullable.field('type', {
      type: ContentType,
      description: 'content style type',
    });
    t.nullable.string('text', {
      description: 'text of the content',
    });
    t.nullable.string('linkName', {
      description: 'url',
    });
  },
});

export const ContentAsset = objectType({
  name: 'ContentAsset',
  description: 'object to hold fields for summary and detail messages',
  definition(t) {
    t.list.field('content', {
      type: ContentDetails,
      description: 'content details',
    });
  },
});

export const ContentAssets = objectType({
  name: 'ContentAssets',
  description: 'object to hold assets to get help content',
  definition(t) {
    t.list.field('assets', {
      type: ContentAsset,
      description: 'asset with content',
    });
  },
});

export const ContentAssetArgs = {
  tags: stringArg(),
  type: stringArg(),
  format: stringArg(),
  filters: stringArg(),
};

export const contentAssetQueryField = queryField('contentAsset', {
  type: ContentAssets,
  args: ContentAssetArgs,
  async resolve(
    _,
    { tags, type, format, filters },
    { dataSources: { contentServiceAPI } },
  ) {
    return contentServiceAPI.getContentAsset(tags, type, format, filters);
  },
});
