import { NexusGenRootTypes, NexusGenEnums } from 'generated/nexusTypes';
import { ContextType } from 'types';

export const CART_VIEW_ID = 'cart-view';

const CHANNEL_SEGMENT_RECORD: Record<
  NexusGenEnums['CartChannel'],
  NexusGenEnums['Segment']
> = {
  personalshop: 'personal',
  businessshop: 'business',
  personalss: 'personal',
};

interface ResolveCartViewParameter {
  cart: NexusGenRootTypes['Cart'];
  context: ContextType;
  channel: NexusGenEnums['CartChannel'];
}

export async function resolveCartView({
  cart,
  context: {
    dataSources: { accountServiceAPI, cartAPI },
  },
  channel,
}: ResolveCartViewParameter): Promise<NexusGenRootTypes['CartView']> {
  try {
    const segment = CHANNEL_SEGMENT_RECORD[channel];

    const accountList = await accountServiceAPI.getAccountList();
    const segmentedAccountList = accountList.filter(
      (account) => account.segment === segment,
    );

    if (!cart || cart.bundles.length === 0) {
      return {
        id: CART_VIEW_ID,
        cart,
        screen: 'EMPTY_SCREEN',
        mandatoryAction: null,
      };
    }

    if (cart.auth.isGuest) {
      if (cart.isAccountNumberRequired) {
        return {
          id: CART_VIEW_ID,
          cart,
          screen: 'OVERVIEW_SCREEN',
          mandatoryAction: 'SIGN_IN',
        };
      }
      return {
        id: CART_VIEW_ID,
        cart,
        screen: 'OVERVIEW_SCREEN',
        mandatoryAction: null,
      };
    }

    const isLineNumberRequired = cart.bundles.some(
      (bundle) => bundle.isLineNumberRequired && !bundle.lineNumber,
    );

    if (isLineNumberRequired) {
      return {
        id: CART_VIEW_ID,
        cart,
        screen: 'OVERVIEW_SCREEN',
        mandatoryAction: 'CHOOSE_ELIGIBLE_IFP_PLAN',
      };
    }

    if (segmentedAccountList.length === 0) {
      return {
        id: CART_VIEW_ID,
        cart: null,
        screen: 'NO_ACCOUNT_SCREEN',
        mandatoryAction: null,
      };
    }

    if (!cart.accountNumber) {
      if (segmentedAccountList.length === 1) {
        const { accountNumber } = segmentedAccountList[0];
        const { body: updatedCart } = await cartAPI.updateCartAccount({
          accountNumber,
          cartId: cart.cartId,
          channel,
        });
        return {
          id: CART_VIEW_ID,
          cart: updatedCart,
          screen: 'OVERVIEW_SCREEN',
          mandatoryAction: null,
        };
      }
      if (segmentedAccountList.length > 1) {
        return {
          id: CART_VIEW_ID,
          cart,
          screen: 'OVERVIEW_SCREEN',
          mandatoryAction: 'CHOOSE_ACCOUNT',
        };
      }
    }

    return {
      id: CART_VIEW_ID,
      cart,
      screen: 'OVERVIEW_SCREEN',
      mandatoryAction: null,
    };
  } catch {
    return {
      id: CART_VIEW_ID,
      cart: null,
      screen: 'EMPTY_SCREEN',
      mandatoryAction: null,
    };
  }
}
