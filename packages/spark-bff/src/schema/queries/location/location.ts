import { objectType, queryField } from 'nexus';

export const Location = objectType({
  name: 'Location',
  description: 'Location Service',
  definition() {},
});

export const locationQueryField = queryField((t) => {
  t.field('location', {
    type: Location,
    resolve() {
      return { address: {} };
    },
  });
});
