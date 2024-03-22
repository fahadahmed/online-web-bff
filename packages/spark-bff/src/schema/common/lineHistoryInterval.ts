import { enumType } from 'nexus';

export const LineHistoryInterval = enumType({
  name: 'LineHistoryInterval',
  members: ['HOURLY', 'DAILY', 'MONTHLY'],
});
