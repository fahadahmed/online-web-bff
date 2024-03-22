import { extendType, objectType } from 'nexus';
import { ContextType } from 'types';
import { A2PDateRange } from '../shared/dateRange';
import { A2PResponsePeriod } from '../shared/responsePeriod';

export const A2PCustomerUsageItem = objectType({
  name: 'A2PCustomerUsageItem',
  description: 'Usage item',
  definition(t) {
    t.string('dateTimeStart', {
      description: 'Start date',
    });
    t.string('dateTimeEnd', {
      description: 'End date',
    });
    t.int('totalSmsCount', {
      description: 'Total amount of sms',
    });
    t.int('sentSmsCount', {
      description: 'Total amount of sent sms',
    });
    t.int('deliveredSmsCount', {
      description: 'Total amount of delivered sms',
    });
    t.int('failedSmsCount', {
      description: 'Total amount of failed sms',
    });
  },
});

export const A2PCustomerUsage = objectType({
  name: 'A2PCustomerUsage',
  description: 'Returns series data for a given customer by date range',
  definition(t) {
    t.implements(A2PResponsePeriod);
    t.list.field('series', {
      type: A2PCustomerUsageItem,
    });
  },
});

export const A2PCustomerUsageQuery = extendType({
  type: 'A2POrganisationDetails',
  definition(t) {
    t.field('usage', {
      type: A2PCustomerUsage,
      args: {
        dateRange: A2PDateRange,
      },
      resolve(
        { customerNumber },
        { dateRange },
        { dataSources: { a2pCustomerAPI } }: ContextType,
      ) {
        return a2pCustomerAPI.getUsage(customerNumber, dateRange);
      },
    });
  },
});
