import {
  arg,
  enumType,
  extendType,
  nullable,
  objectType,
  stringArg,
} from 'nexus';
import { definitions } from 'generated/typings/spendHistoryService';

type BreakdownType =
  definitions['SummarisedPeriodSpend']['periodBreakdown'][0]['breakdownType'];

const lineSpendHistoryBreakdownTypes: BreakdownType[] = [
  'PLAN',
  'ADDITIONAL_INCLUDED',
  'ADDITIONAL_PAID',
  'CREDIT',
];

export const LineSpendHistoryBreakdownType = enumType({
  name: 'LineSpendHistoryBreakdownType',
  description:
    'An enum representing the high-level product type associated with the breakdown.',
  members: lineSpendHistoryBreakdownTypes,
});

export const LineSpendHistoryContributingProduct = objectType({
  name: 'LineSpendHistoryContributingProduct',
  definition(t) {
    t.nullable.string('offerId', {
      description: 'The downstream Offer ID associated to this product.',
    });
    t.string('productName', {
      description: 'The customer-facing name for this product.',
    });
    t.string('chargeStartDateTime', {
      description:
        'The date when the instance of this product was purchased, renewed or activated.',
    });
    t.nullable.string('chargeEndDateTime', {
      description: 'The date when the charge for the product is ended.',
    });
    t.nullable.string('productEndDateTime', {
      description: 'The date when the product service is terminated.',
    });
    t.float('periodSpend', {
      description:
        'The spend to the line for this product, it will have 2 d.p.',
    });
  },
});

export const LineSpendHistoryPeriodBreakdownDetail = objectType({
  name: 'LineSpendHistoryPeriodBreakdownDetail',
  definition(t) {
    t.field('breakdownType', {
      type: LineSpendHistoryBreakdownType,
    });
    t.nullable.string('periodBreakdownId', {
      description:
        'An identifier that can be supplied to the Line Spend History Detail API endpoint to retrieve product-level spend details for this specific period. If this product-level breakdown is not available downstream then this identifier will be null.',
    });
    t.float('periodSpend', {
      description: 'The period spend for this breakdown, it will have 2 d.p.',
    });
  },
});

export const LineSpendHistorySummarisedPeriodSpend = objectType({
  name: 'LineSpendHistorySummarisedPeriodSpend',
  definition(t) {
    t.string('startDateTime', {
      description:
        'The ISO8601 date-time representing the start of the spend history summary response.',
    });
    t.string('endDateTime', {
      description:
        'The ISO8601 date-time representing the end of the spend history summary response.',
    });
    t.float('periodSpend', {
      description: 'The spend to the line for this period, it will have 2 d.p.',
    });
    t.boolean('unbilled', {
      description:
        'Whether this summarised period has been billed - always false if PREPAID.',
    });
    t.list.field('periodBreakdown', {
      type: LineSpendHistoryPeriodBreakdownDetail,
      description:
        'An array of objects representing a breakdown of the high-level product types that contributed to the overall spend attributed to this line for the period. If this breakdown-level information is not available downstream then the array will be empty.',
    });
  },
});

export const LineSpendHistoryResponse = objectType({
  name: 'LineSpendHistoryResponse',
  definition(t) {
    t.field('interval', {
      type: 'LineHistoryInterval',
      description:
        'Identifies the type of summary returned. Current supported value is MONTHLY',
    });
    t.field('accountType', {
      type: 'BalanceManagement',
    });
    t.string('startDateTime', {
      description:
        'The ISO8601 date-time representing the start of the spend history summary response.',
    });
    t.string('endDateTime', {
      description:
        'The ISO8601 date-time representing the end of the spend history summary response.',
    });
    t.boolean('gstInclusive', {
      description:
        'A flag to indicate whether the spend values (charges, discounts, credits, etc) are exclusive of GST.',
    });
    t.float('averagePeriodSpend', {
      description: 'The average period spend, it will have 2 d.p.',
    });
    t.list.field('summarisedPeriods', {
      type: LineSpendHistorySummarisedPeriodSpend,
      description:
        "An array of the summarised periods covered in this historical spend query sorted chronologically based on the object's startDateTime attribute value.  If no periods are covered then an empty array should be returned.",
    });
  },
});

export const LineSpendHistoryDetailResponse = objectType({
  name: 'LineSpendHistoryDetailResponse',
  definition(t) {
    t.field('interval', {
      type: 'LineHistoryInterval',
      description:
        'Identifies the type of summary returned. Current supported value is MONTHLY',
    });
    t.field('breakdownType', {
      type: LineSpendHistoryBreakdownType,
    });
    t.boolean('gstInclusive', {
      description:
        'A flag to indicate whether the spend values (charges, discounts, credits, etc) are exclusive of GST.',
    });
    t.string('startDateTime', {
      description:
        'The ISO8601 date-time representing the start of the spend history summary response.',
    });
    t.string('endDateTime', {
      description:
        'The ISO8601 date-time representing the end of the spend history summary response.',
    });
    t.float('periodSpend', {
      description: 'The period spend, it will have 2 d.p.',
    });
    t.boolean('unbilled', {
      description:
        'Whether this summarised period has been billed - always false if PREPAID.',
    });
    t.list.field('contributingProducts', {
      type: LineSpendHistoryContributingProduct,
      description:
        'An array of the products that contributed to this total spend over the nominated period. If no products are identified for the period then an empty array will be returned.',
    });
  },
});

export const LineSpendHistoryArgs = {
  interval: arg({ type: 'LineHistoryInterval' }),
  start: nullable(stringArg()),
  end: nullable(stringArg()),
};

export const LineSpendHistoryDetailArgs = {
  interval: arg({ type: 'LineHistoryInterval' }),
  periodBreakdownId: stringArg(),
};

export const LineSpendHistory = extendType({
  type: 'Line',
  definition(t) {
    t.field('spendHistory', {
      description:
        'Returns a summary of a spend (charges, discounts, credits, etc) associated to the supplied line number for a defined interval. Note currently only a monthly reporting period is supported.',

      type: LineSpendHistoryResponse,
      args: LineSpendHistoryArgs,
      async resolve(
        { lineNumber },
        args,
        { dataSources: { spendHistoryServiceAPI } },
      ) {
        const { interval, start, end } = args;
        return spendHistoryServiceAPI.getSpendHistory(
          lineNumber,
          interval,
          start,
          end,
        );
      },
    });
    t.field('spendHistoryDetail', {
      type: LineSpendHistoryDetailResponse,
      args: LineSpendHistoryDetailArgs,
      async resolve(
        { lineNumber },
        args,
        { dataSources: { spendHistoryServiceAPI } },
      ) {
        const { interval, periodBreakdownId } = args;
        return spendHistoryServiceAPI.getSpendHistoryDetail(
          lineNumber,
          interval,
          periodBreakdownId,
        );
      },
    });
  },
});
