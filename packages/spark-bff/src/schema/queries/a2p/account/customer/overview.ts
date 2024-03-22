import { extendType, objectType } from 'nexus';
import { ContextType } from 'types';
import { A2PDateRange } from '../shared/dateRange';
import { A2PResponsePeriod } from '../shared/responsePeriod';

export const A2PCustomerOverview = objectType({
  name: 'A2PCustomerOverview',
  description:
    'Returns overview of sms metrics for all customers. Admin dashboard overview for admin role',
  definition(t) {
    t.implements(A2PResponsePeriod);
    t.int('totalSmsCount', {
      description: 'Total amount of sms',
    });
    t.int('sentSmsCount', {
      description: 'Total amount of sms sent',
    });
    t.int('deliveredSmsCount', {
      description: 'Total amount of sms delivered',
    });
    t.int('failedSmsCount', {
      description: 'Total amount of sms failed',
    });
  },
});

export const A2PCustomerOverviewQuery = extendType({
  type: 'A2POrganisationDetails',
  definition(t) {
    t.field('overview', {
      type: A2PCustomerOverview,
      args: {
        dateRange: A2PDateRange,
      },
      resolve(
        { customerNumber },
        { dateRange },
        { dataSources: { a2pCustomerAPI } }: ContextType,
      ) {
        return a2pCustomerAPI.getCustomerOverview(customerNumber, dateRange);
      },
    });
  },
});
