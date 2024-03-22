import { extendType, objectType } from 'nexus';
import { ContextType } from 'types';
import { A2PDateRange } from '../shared/dateRange';
import { A2PResponsePeriod } from '../shared/responsePeriod';

export const A2PAdminOverview = objectType({
  name: 'A2PAdminOverview',
  description:
    'Returns overview of sms metrics for all customers. Admin dashboard overview for admin role',
  definition(t) {
    t.implements(A2PResponsePeriod);
    t.int('totalCustomersCount', {
      description: 'Total amount of customers',
    });
    t.int('totalShortcodesCount', {
      description: 'Total amount of shortcodes',
    });
    t.int('pendingShortcodesCount', {
      description: 'Total amount of pending shortcodes',
    });
    t.int('suspendedShortcodesCount', {
      description: 'Total amount of suspended shortcodes',
    });
  },
});

export const A2PAdminOverviewQuery = extendType({
  type: 'A2POrganisationDetails',
  definition(t) {
    t.field('adminOverview', {
      type: A2PAdminOverview,
      args: {
        dateRange: A2PDateRange,
      },
      resolve(
        _,
        { dateRange },
        { dataSources: { a2pCustomerAPI } }: ContextType,
      ) {
        return a2pCustomerAPI.getAdminOverview(dateRange);
      },
    });
  },
});
