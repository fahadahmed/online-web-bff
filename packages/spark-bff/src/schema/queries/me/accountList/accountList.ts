import { extendType, objectType } from 'nexus';
import { Segment } from '../../../common/cartChannel';

export const AccountAssociatedProduct = objectType({
  name: 'AccountAssociatedProduct',
  definition(t) {
    t.nullable.string('lineNumber');
    t.nullable.string('assetId');
    t.nullable.string('offerId');
    t.nullable.string('offerName');
    t.nullable.string('productInstanceId');
    t.boolean('ifpEligible');
  },
});

export const BasicAccountInformation = objectType({
  name: 'AccountList',
  description: 'Object representing an account',
  definition(t) {
    t.string('accountNumber');
    t.string('accountId');
    t.string('customerNumber');
    t.string('customerSegment', {
      description: "DESL's customerSegment e.g. 'Consumer' or 'Business'",
      deprecation: 'Use segment instead',
    });
    t.field('segment', {
      type: Segment,
      description: "Cleaned segment enum e.g. 'personal' or 'business'",
    });
    t.nullable.field('balanceManagement', {
      type: 'BalanceManagement',
      description:
        'The type of the line (if this is a line level access record), or of all the lines under the account (if this is an account level access record).  Strictly speaking, this is an account-level attribute, but we mostly use it at line level, so I have phrased it that way.',
    });
    t.nullable.string('businessName');
    t.string('status');
    t.nullable.string('firstName');
    t.nullable.string('lastName');
    t.boolean('inCollections');
    t.nullable.list.field('products', {
      type: AccountAssociatedProduct,
    });
  },
});

export const AccountList = extendType({
  type: 'User',
  definition(t) {
    // Calling this account list to be consistent with the DESL and accounts is already taken. Should probably revisit this as well.
    t.list.field('accountList', {
      type: BasicAccountInformation,
      description:
        'Returns a simple list of all accounts accessible by a Spark Identity. DESL API: https://sparknz.atlassian.net/wiki/spaces/DC/pages/9734029601/GET+Account+List+API+Design',
      async resolve(_, __, { dataSources: { accountServiceAPI } }) {
        return accountServiceAPI.getAccountList();
      },
    });
  },
});
