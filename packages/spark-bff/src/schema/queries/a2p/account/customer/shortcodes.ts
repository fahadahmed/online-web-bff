import { NexusGenRootTypes } from 'generated/nexusTypes';
import { extendType, intArg, nullable, objectType } from 'nexus';
import { ContextType } from 'types';
import { A2PDateRange } from '../shared/dateRange';
import { A2PShortcodeType } from '../shared/shortcodeType';
import { A2PCustomerShortcodeBase } from './shortcode';

export const A2PCustomerShortcodeListItem = objectType({
  name: 'A2PCustomerShortcodeListItem',
  description: 'Shortcode list item',
  definition(t) {
    t.implements(A2PCustomerShortcodeBase);
    t.nullable.field('type', {
      type: A2PShortcodeType,
    });
  },
});

function topNShortcodes(
  shortcodes: NexusGenRootTypes['A2PCustomerShortcodeListItem'][],
  topAmount: number,
) {
  let result = shortcodes;

  if (topAmount > 0 && topAmount < shortcodes.length) {
    // we should return top N shortcodes by "totalSmsCount"
    const usages = shortcodes.map((shortcode) => ({
      shortcode,
      usage:
        shortcode.usage.series?.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.totalSmsCount,
          0,
        ) || 0,
    }));

    usages.sort((a, b) => b.usage - a.usage);
    result = usages
      .filter((item, index) => index < topAmount)
      .map((item) => item.shortcode);
  }

  return result;
}

export const A2PCustomerShortcodesQuery = extendType({
  type: 'A2POrganisationDetails',
  definition(t) {
    t.list.field('shortcodes', {
      type: A2PCustomerShortcodeListItem,
      args: {
        dateRange: nullable(A2PDateRange),
        topAmount: nullable(intArg()),
      },
      async resolve(
        { customerNumber },
        { dateRange, topAmount },
        { dataSources: { a2pCustomerAPI } }: ContextType,
      ) {
        const shortcodes = topNShortcodes(
          (await a2pCustomerAPI.getShortcodes(customerNumber, dateRange)) || [],
          topAmount,
        );

        return shortcodes;
      },
    });
  },
});
