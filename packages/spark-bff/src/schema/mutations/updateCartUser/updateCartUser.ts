import { mutationField, idArg } from 'nexus';
import { NexusGenEnums } from 'generated/nexusTypes';
import { Segment } from '../../common';
import { CartView, resolveCartView, CART_VIEW_ID } from '../../queries';

const SEGMENT_CHANNEL_RECORD: Record<
  NexusGenEnums['Segment'],
  NexusGenEnums['CartChannel']
> = {
  personal: 'personalshop',
  business: 'businessshop',
};

export const updateCartUserMutation = mutationField('updateCartUser', {
  type: CartView,
  description: "Update the cart's user and returns with a CartView",
  args: { cartId: idArg(), segment: Segment },

  async resolve(_, args, context) {
    const { cartId, segment } = args;
    const {
      dataSources: { accountServiceAPI, cartAPI },
    } = context;

    const accountList = await accountServiceAPI.getAccountList();
    const segmentedAccountList = accountList.filter(
      (account) => account.segment === segment,
    );

    if (segmentedAccountList.length === 0) {
      return {
        id: CART_VIEW_ID,
        cart: null,
        screen: 'NO_ACCOUNT_SCREEN',
        mandatoryAction: null,
      };
    }

    const channel = SEGMENT_CHANNEL_RECORD[segment];
    const cart = await cartAPI.getCart({ cartId, channel });

    if (!cart.accountNumber && segmentedAccountList.length === 1) {
      const { accountNumber } = segmentedAccountList[0];
      const { body: cartWithUpdatedAccountNumber } =
        await cartAPI.updateCartAccount({
          accountNumber,
          cartId,
          channel,
        });
      return resolveCartView({
        cart: cartWithUpdatedAccountNumber,
        channel,
        context,
      });
    }

    return resolveCartView({
      cart,
      channel,
      context,
    });
  },
});
