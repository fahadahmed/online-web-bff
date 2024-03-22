import { arg, enumType, extendType, nullable } from 'nexus';

export const LineAccessLevelType = enumType({
  name: 'LineAccessLevelType',
  members: ['LINE_LEVEL'],
});

export const UserWithLines = extendType({
  type: 'User',
  definition(t) {
    t.nullable.list.field('lines', {
      type: 'Line',
      args: {
        accessLevel: nullable(arg({ type: LineAccessLevelType })),
      },
      description: 'Lines the user has access to',
      async resolve(_, { accessLevel }, { dataSources: { accessAPI } }) {
        return accessAPI.getLines(accessLevel);
      },
    });
  },
});
