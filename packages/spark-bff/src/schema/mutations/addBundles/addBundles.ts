import { inputObjectType, objectType, mutationField, enumType } from 'nexus';
import {
  CartChannel,
  BundleAction,
  BundleAutoRenew,
  BundleSystemAction,
} from '../../common';
import { Cart } from '../../queries';

export const ProcessContext = enumType({
  name: 'ProcessContext',
  members: [
    'NewOffer',
    'MobileMigrate',
    'ModifyOffer',
    'ChangeOffer',
    'AddVAS',
    'ManageVAS',
  ],
  description:
    'The process context used for orchestration and creation of the downstream service order',
});

export const ProductCharacteristicsInput = inputObjectType({
  name: 'ProductCharacteristicsInput',
  description: 'Input for productCharacteristics',
  definition(t) {
    t.nullable.field('autoRenew', {
      type: BundleAutoRenew,
    });
    t.nullable.field('systemAction', {
      type: BundleSystemAction,
    });
  },
});

export const AddBundlesInputItem = inputObjectType({
  name: 'AddBundlesInputItem',
  description:
    'Input for adding items in the new bundle when cart id is unknown.',
  definition(t) {
    t.string('offerId');
    t.nullable.string('productInstanceId');
    t.nullable.int('quantity');
    t.nullable.field('action', {
      type: BundleAction,
    });
    t.nullable.field('productCharacteristics', {
      type: ProductCharacteristicsInput,
    });
  },
});

export const AddBundlesInputBundle = inputObjectType({
  name: 'AddBundlesInputBundle',
  description: 'Input for adding bundles when cart id is unknown.',
  definition(t) {
    t.nullable.string('categoryId', {
      description: 'Category Id',
    });
    t.list.field('items', {
      type: AddBundlesInputItem,
    });
    t.nullable.string('lineNumber');
    t.nullable.string('accountNumber');
  },
});

export const AddBundlesInput = inputObjectType({
  name: 'AddBundlesInput',
  description:
    'Input for adding items in the new bundle when cart id is unknown.',
  definition(t) {
    t.list.field('bundles', {
      type: AddBundlesInputBundle,
    });
    t.nullable.field('processContext', {
      type: ProcessContext,
      description:
        'The process context used for orchestration and creation of the downstream service order',
      deprecation: 'No longer in use, please remove',
    });
    t.field('channel', {
      type: CartChannel,
    });
  },
});

export const AddBundlesResponseItem = objectType({
  name: 'AddBundlesResponseItem',
  definition(t) {
    t.string('itemId');
    t.string('offerId');
  },
});

export const AddBundlesResponse = objectType({
  name: 'AddBundlesResponse',
  definition(t) {
    t.boolean('isAffected');
    t.string('bundleId');
    t.string('categoryId');
    t.string('categoryName');
    t.list.field('items', { type: AddBundlesResponseItem });
  },
});

export const AddBundleOperationResponse = objectType({
  name: 'AddBundleOperationResponse',
  definition(t) {
    t.implements('GenericMutationResponse');
    t.nullable.field('cart', { type: Cart });
    t.nullable.string('cartId', {
      deprecation: 'Use cart instead',
    });
    t.nullable.list.field('bundles', {
      type: AddBundlesResponse,
      deprecation: 'Use cart instead',
    });
  },
});

export const AddBundles = mutationField('addBundles', {
  type: AddBundleOperationResponse,
  description: 'Add items to new bundle',
  args: { input: AddBundlesInput },

  async resolve(_, params, { dataSources: { cartAPI }, res }) {
    const { input } = params;
    // TODO remove `processContext`
    const { processContext } = input;

    const { headers, body: resBody } = await cartAPI.addBundles(input);

    const setCookieHeader = headers?.get('set-cookie');

    // Include all the process contexts used for shop
    const isShopJourney = processContext === 'NewOffer';
    const shouldSetCookies =
      isShopJourney && setCookieHeader && resBody.success;

    if (shouldSetCookies) {
      // Note: This is to handle multiple set-cookies seperated by comma
      res.setHeader('set-cookie', setCookieHeader.split(','));
    }

    return resBody;
  },
});
