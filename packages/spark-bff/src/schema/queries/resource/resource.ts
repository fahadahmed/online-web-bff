import { objectType, queryField, stringArg } from 'nexus';

export const LineResource = objectType({
  name: 'LineResource',
  description: 'An object that contains all line information',
  definition(t) {
    t.nullable.field('lineType', {
      type: 'LineType',
      description: 'The type of service on the line',
    });
    t.boolean('isLineAccessAllowed', {
      description:
        'Indicates whether the user is allowed to add access to this line',
    });
  },
});

export const AccountResource = objectType({
  name: 'AccountResource',
  description: 'An object that contains all account information',
  definition(t) {
    t.nullable.boolean('isPasswordProtected', {
      description:
        'Indicates whether the corresponding customer has a password setup in Siebel',
    });
    t.boolean('isAccountAccessAllowed', {
      description:
        'Indicates whether the user is allowed to add access to this account',
    });
    t.nullable.boolean('hasBusinessName', {
      description:
        'Indicates whether there is a business name present in the corresponding customer',
    });
  },
});

export const Resource = objectType({
  name: 'Resource',
  description: 'Information relating to resources',
  definition(t) {
    t.boolean('isNumberIdentified', {
      description:
        'Indicates if the resource provided has been identified or not',
    });
    t.nullable.field('line', {
      description: 'An object that contains all line information',
      type: LineResource,
    });
    t.nullable.field('account', {
      description: 'An object that contains all account information',
      type: AccountResource,
    });
  },
});

export const ResourceQueryField = queryField('resource', {
  type: Resource,
  args: { resourceId: stringArg() },
  async resolve(_, { resourceId }, { dataSources: { resourceAPI } }) {
    return resourceAPI.getResourceType(resourceId);
  },
});
