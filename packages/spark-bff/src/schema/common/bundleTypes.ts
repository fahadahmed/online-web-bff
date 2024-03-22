import { enumType } from 'nexus';
import { definitions } from 'generated/typings/cartServiceV2';

type Item = definitions['AddToCartRequest']['bundles'][0]['items'][0];

const bundleActionMembers: Item['action'][] = [
  'add',
  'delete',
  'keep',
  'modify',
];

export const BundleAction = enumType({
  name: 'AddBundleAction',
  members: bundleActionMembers,
  description: 'The action to perform on the cart item',
});

const bundleAutoRenewMembers: Item['productCharacteristics']['autorenew'][] = [
  'ON',
  'OFF',
  'GR',
];

export const BundleAutoRenew = enumType({
  name: 'AddBundleAutoRenew',
  members: bundleAutoRenewMembers,
  description: 'Use to cancel or resume an existing product',
});

const bundleSystemActionMembers: Item['productCharacteristics']['systemAction'][] =
  ['ADDED', 'CANCEL', 'NONE', 'RESUME', 'TERMINATE', 'UPDATE'];

export const BundleSystemAction = enumType({
  name: 'AddBundleSystemAction',
  members: bundleSystemActionMembers,
  description:
    'Use to send action to downstream CRM to invoke follow on orders',
});
