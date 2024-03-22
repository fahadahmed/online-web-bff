import { interfaceType, enumType } from 'nexus';

export const A2PPeriodInterval = enumType({
  name: 'A2POverviewInterval',
  members: ['DAYS', 'MONTHS', 'YEARS'],
  description: 'Overview interval',
});

export const A2PResponsePeriod = interfaceType({
  name: 'A2PResponsePeriod',
  description: 'Interface for response with dates',
  resolveType: () => {
    return null;
  },
  definition(t) {
    t.nullable.int('length', {
      description: 'Overview length in days',
    });
    t.nullable.field('interval', {
      type: A2PPeriodInterval,
      description: 'Overview interval',
    });
    t.nullable.string('dateTimeStart', {
      description: 'Start date',
    });
    t.nullable.string('dateTimeEnd', {
      description: 'End date',
    });
  },
});
