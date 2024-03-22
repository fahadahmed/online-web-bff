import { enumType } from 'nexus';

export const A2PDateRange = enumType({
  name: 'A2PDateRange',
  members: ['last7days', 'last30days', 'last6months', 'last12months'],
  description: 'Date range',
});
