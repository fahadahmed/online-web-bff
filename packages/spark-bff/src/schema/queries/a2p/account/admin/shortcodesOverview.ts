import { extendType, objectType } from 'nexus';
import { ContextType } from 'types';
import { A2PDateRange } from '../shared/dateRange';
import { A2PResponsePeriod } from '../shared/responsePeriod';

export const A2PAdminShortcodesOverview = objectType({
  name: 'A2PAdminShortcodesOverview',
  description:
    'Returns overview of sms metrics for all shortcodes used by the admin dashboard overview for admin role',
  definition(t) {
    t.implements(A2PResponsePeriod);
    t.int('totalShortcodesCount', {
      description: 'Total amount of shortcodes',
    });
    t.int('activeShortcodesCount', {
      description: 'Total amount of active shortcodes',
    });
    t.int('pendingShortcodesCount', {
      description: 'Total amount of pending shortcodes',
    });
    t.int('suspendedShortcodesCount', {
      description: 'Total amount of suspended shortcodes',
    });
  },
});

export const A2PAdminShortcodesOverviewQuery = extendType({
  type: 'A2POrganisationDetails',
  definition(t) {
    t.field('adminShortcodesOverview', {
      type: A2PAdminShortcodesOverview,
      args: {
        dateRange: A2PDateRange,
      },
      resolve(
        _,
        { dateRange },
        { dataSources: { a2pShortcodesAPI } }: ContextType,
      ) {
        return a2pShortcodesAPI.getShortcodesOverview(dateRange);
      },
    });
  },
});
