import { objectType, queryField } from 'nexus';

export const User = objectType({
  name: 'User',
  description: 'Logged in users information',
  definition() {},
});

export const meQueryField = queryField((t) => {
  t.field('me', {
    type: User,
    resolve() {
      return {};
    },
  });
});
