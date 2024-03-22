import { enumType } from 'nexus';
import { definitions } from 'generated/typings/cartServiceV2';

type FrequencyType = definitions['Price']['priceType'];

const frequencyTypeMembers: FrequencyType[] = ['Recurring', 'OneOff'];

export const FrequencyType = enumType({
  name: 'FrequencyType',
  members: frequencyTypeMembers,
  description: 'Frequency Type',
});

type FrequencyPeriod = definitions['Price']['frequency']['period'];

const frequencyPeriodMembers: FrequencyPeriod[] = [
  'Day',
  'Hour',
  'Month',
  'Week',
  'Year',
];

export const FrequencyPeriod = enumType({
  name: 'FrequencyPeriod',
  members: frequencyPeriodMembers,
  description: 'Frequency Period',
});
