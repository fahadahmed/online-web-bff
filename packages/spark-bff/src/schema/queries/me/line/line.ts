import { extendType, objectType, stringArg } from 'nexus';

export const Line = objectType({
  name: 'Line',
  description: 'Object representing a line',
  definition(t) {
    t.string('lineNumber', {
      description: "The line's number",
    });
    t.nullable.string('displayName', {
      description: 'The user friendly name of the line',
      resolve: async (line, _, { dataSources: { accessAPI } }) => {
        const lineData = await accessAPI.getLineByNumber(line.lineNumber);
        return lineData.displayName;
      },
    });
  },
});

export const lineQuery = extendType({
  type: 'User',
  definition(t) {
    t.field('line', {
      type: 'Line',
      args: {
        lineNumber: stringArg(),
      },
      resolve(_, { lineNumber }) {
        return { lineNumber };
      },
    });
  },
});
