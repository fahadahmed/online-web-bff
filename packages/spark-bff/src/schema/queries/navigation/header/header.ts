import { objectType, nullable, stringArg, queryField } from 'nexus';

export const Category = objectType({
  name: 'Category',
  definition(t) {
    t.string('iconName');
    t.string('label');
    t.nullable.string('url');
  },
});

export const HeaderContent = objectType({
  name: 'HeaderContent',
  definition(t) {
    t.list.field('personalCategories', {
      type: Category,
    });
    t.list.field('businessCategories', {
      type: Category,
    });
    t.list.field('personalCategoriesDesktop', {
      type: Category,
    });
    t.list.field('businessCategoriesDesktop', {
      type: Category,
    });
  },
});

export const HeaderContentQueryArgs = {
  id: stringArg(),
  variation: nullable(stringArg()),
  site: nullable(stringArg()),
};

export const HeaderContentQuery = queryField('headerContent', {
  type: HeaderContent,
  args: HeaderContentQueryArgs,
  description: 'Gets content for header navigation menu',
  async resolve(
    _,
    { id, variation, site },
    { dataSources: { contentServiceAPI } },
  ) {
    return contentServiceAPI.getHeaderContent(id, variation, site);
  },
});
