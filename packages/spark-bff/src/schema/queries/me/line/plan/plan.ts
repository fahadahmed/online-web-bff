import { enumType, extendType, objectType } from 'nexus';

const CustomerSegment = enumType({
  name: 'CustomerSegment',
  members: ['Consumer', 'Business'],
  description: 'Customer Segment',
});

export const LinePlan = objectType({
  name: 'LinePlan',
  description:
    'Fetch line plan information from Line Plan API https://sparknz.atlassian.net/wiki/spaces/DC/pages/9833644419/GET+Line+Plan+API',
  definition(t) {
    t.field('balanceManagement', {
      type: 'BalanceManagement',
    });
    t.nullable.string('contractEndDate');
    t.field('customerSegment', {
      type: CustomerSegment,
    });
    t.string('lineOfBusiness');
    t.nullable.string('legalCategory');
    t.nullable.string('offerId');
    t.float('price');
    t.string('productId');
    t.string('productName');
    t.string('planType');
    t.boolean('showPricesIncludingGST');
  },
});

export const LinePlanQuery = extendType({
  type: 'Line',
  definition(t) {
    t.field('plan', {
      type: LinePlan,
      async resolve({ lineNumber }, _, { dataSources: { lineDetailsAPI } }) {
        return lineDetailsAPI.getAssociatedPlan(lineNumber);
      },
    });
  },
});
