import Loki from 'lokijs';
import { definitions } from 'generated/typings/cartServiceV2';

type CartData = definitions['CartData'];
type Bundle = definitions['CartBundle'];
type Items = Bundle['items'];
type Item = Items[0];

const db = new Loki('cart');
const cart = db.addCollection('cart');

function initiateCartDB(data: CartData | CartData[] = undefined) {
  if (cart.data.length === 0 && data) {
    return cart.insert(data);
  }
  return true;
}

function getCurrentId() {
  return cart.data[0].cartId;
}

function getById(cartId: string) {
  return cart.findOne({ cartId });
}

function deleteBundle(cartId: string, bundleId: string) {
  return cart.updateWhere(
    (data: CartData) => data.cartId === cartId,
    (prevData: CartData) => {
      return {
        ...prevData,
        bundles: prevData.bundles.filter((bundle) => bundle.id !== bundleId),
      };
    },
  );
}

function deleteItemFromBundle(
  cartId: string,
  bundleId: string,
  itemId: string,
) {
  return cart.updateWhere(
    (data: CartData) => data.cartId === cartId,
    (prevData: CartData) => {
      const targetBundleIndex = prevData.bundles.findIndex(
        (bundle) => bundle.id === bundleId,
      );
      const targetItemIndex = prevData.bundles[
        targetBundleIndex
      ].items.findIndex((item) => item.id === itemId);

      return prevData.bundles[targetBundleIndex].items.splice(
        targetItemIndex,
        1,
      );
    },
  );
}

function addBundle(cartId: string, bundle: Bundle) {
  return cart.updateWhere(
    (data: CartData) => data.cartId === cartId,
    (prevData: CartData) => {
      return {
        ...prevData,
        bundles: prevData.bundles.concat(bundle),
      };
    },
  );
}

function addItemToBundle(cartId: string, bundleId: string, item: Item) {
  return cart.updateWhere(
    (data: CartData) => data.cartId === cartId,
    (prevData: CartData) => {
      const bundleToAddIndex = prevData.bundles.findIndex(
        (bundle) => bundle.id === bundleId,
      );

      return prevData.bundles[bundleToAddIndex].items.push(item);
    },
  );
}

function clearDB() {
  cart.clear();
}

export default {
  initiateCartDB,
  getCurrentId,
  getById,
  deleteBundle,
  deleteItemFromBundle,
  addBundle,
  addItemToBundle,
  clearDB,
};
