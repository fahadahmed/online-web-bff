import { extendType, nullable, objectType } from 'nexus';
import { ContextType } from 'types';
import { A2PDateRange } from '../shared/dateRange';
import { A2PShortcodeCTA } from '../shared/shortcodeCTA';
import { A2PShortcodeType } from '../shared/shortcodeType';
import { A2PShortcodeStatus } from '../shared/stortcodeStatus';

export const A2PAdminShortcodeItem = objectType({
  name: 'A2PAdminShortcodeItem',
  description:
    'Returns overview of sms metrics for all shortcodes used by the admin dashboard overview for admin role',
  definition(t) {
    t.int('customerNumber', {
      description: 'Customer number',
    });
    t.string('customerName', {
      description: 'Customer name',
    });
    t.int('shortCodeNumber', {
      description: 'Shortcode number',
    });
    t.field('status', {
      description: 'Shortcode status',
      type: A2PShortcodeStatus,
    });
    t.field('type', {
      description: 'Shortcode type',
      type: A2PShortcodeType,
    });
    t.list.field('ctas', {
      description: 'Shortcode CTAs',
      type: A2PShortcodeCTA,
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

export const A2PAdminShortcodesQuery = extendType({
  type: 'A2POrganisationDetails',
  definition(t) {
    t.list.field('adminShortcodes', {
      type: A2PAdminShortcodeItem,
      args: {
        dateRange: nullable(A2PDateRange),
      },
      resolve(
        _,
        { dateRange },
        { dataSources: { a2pShortcodesAPI } }: ContextType,
      ) {
        return a2pShortcodesAPI.getShortcodes(dateRange);
      },
    });
  },
});
