import { nullable, objectType, queryField, stringArg, list } from 'nexus';
import { definitions } from 'generated/typings/contentService';

export type Section = definitions['FooterMenuResponse']['menus'];

export const FooterLinkItem = objectType({
  name: 'FooterLinkItem',
  definition(t) {
    t.nonNull.string('id');
    t.string('label');
    t.string('url');
    t.nullable.string('iconName');
  },
});

export const FooterMenuItem = objectType({
  name: 'FooterMenuItem',
  definition(t) {
    t.nonNull.string('id');
    t.string('heading');
    t.string('url');
    t.field('items', {
      type: list(FooterLinkItem),
    });
  },
});

export const FooterContent = objectType({
  name: 'FooterContentResponse',
  definition(t) {
    t.field('footerLinkMenu', {
      type: list(FooterMenuItem),
    });
    t.field('footerLegalLinks', {
      type: list(FooterLinkItem),
    });
    t.field('footerSocialMediaLinks', {
      type: list(FooterLinkItem),
    });
  },
});

export const FooterContentQueryArgs = {
  id: stringArg(),
  variation: nullable(stringArg()),
  site: nullable(stringArg()),
};

export const FooterContentQuery = queryField('footerContent', {
  type: FooterContent,
  args: FooterContentQueryArgs,
  description: 'Gets content for footer navigation menu',
  async resolve(
    _,
    { id, variation, site },
    { dataSources: { contentServiceAPI } },
  ) {
    return contentServiceAPI.getFooterContent(id, variation, site);
  },
});
