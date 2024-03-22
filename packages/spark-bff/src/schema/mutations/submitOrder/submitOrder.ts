import { inputObjectType, mutationField, objectType } from 'nexus';
import { SubmitOrderParameter } from 'datasources/shop/order/OrderAPI';
import { CartChannel } from '../../common';

const CardToSaveInput = inputObjectType({
  name: 'CardToSaveInput',
  definition(t) {
    t.float('amount');
    t.nullable.string('cardholderName');
    t.string('token');
  },
});

const OneTimeCardInput = inputObjectType({
  name: 'OneTimeCardInput',
  definition(t) {
    t.float('amount');
    t.string('token');
  },
});

const SavedPaymentMethodInput = inputObjectType({
  name: 'SavedPaymentMethodInput',
  definition(t) {
    t.float('amount');
    t.string('paymentMethodId');
  },
});

const AccountBalance = inputObjectType({
  name: 'accountBalance',
  definition(t) {
    t.float('amount');
  },
});

const SubmitOrderInput = inputObjectType({
  name: 'SubmitOrderInput',
  definition(t) {
    t.string('cartId', {
      description: 'Cart ID for which the order has to be submitted',
    });
    t.field('channel', {
      type: CartChannel,
    });
    t.nullable.field('cardToSave', {
      type: CardToSaveInput,
    });
    t.nullable.field('oneTimeCard', {
      type: OneTimeCardInput,
    });
    t.nullable.field('savedPaymentMethod', {
      type: SavedPaymentMethodInput,
    });
    t.nullable.field('accountBalance', {
      type: AccountBalance,
    });
    t.nullable.boolean('hasRegisterPaymentMethodOnly', {
      deprecation: 'Not used by Shop',
    });
    t.nullable.string('lineNumber', {
      deprecation: 'Not used by Shop',
    });
  },
});

export const SubmitOrderResponse = objectType({
  name: 'SubmitOrderResponse',
  description: 'Submit Order Response',
  definition(t) {
    t.nullable.string('orderNumber');
    t.nullable.string('confirmationEmailId');
    t.implements('GenericMutationResponse');
  },
});

export const SubmitOrder = mutationField('submitOrder', {
  type: SubmitOrderResponse,
  args: { input: SubmitOrderInput },
  deprecation: 'Legacy mutation, currently only for Retail',
  async resolve(_, { input }, { dataSources: { orderAPI, walletServiceAPI } }) {
    const {
      cartId,
      cardToSave,
      oneTimeCard,
      savedPaymentMethod,
      accountBalance,
      channel,
    } = input;

    let saveCardResponse = null;
    let payment: SubmitOrderParameter['payment'] = {
      source: 'DIRECT',
      amount: 0,
    };

    if (accountBalance) {
      // Submit order and pay using account balance (on next bill)
      payment = {
        ...accountBalance,
        source: 'ACCOUNT',
      };
    } else if (savedPaymentMethod) {
      // Submit order with an already saved payment method
      payment = {
        ...savedPaymentMethod,
        source: 'WALLET_SELF',
      };
    } else if (oneTimeCard) {
      // Submit order with a one-time card payment
      payment = {
        amount: oneTimeCard.amount,
        secureTransactionToken: oneTimeCard.token,
        source: 'NEW_CARD',
      };
    } else if (cardToSave) {
      // Save a card to wallet and submit order
      saveCardResponse = await walletServiceAPI.saveCard({
        ...cardToSave,
        isPreferred: true,
      });

      if (typeof saveCardResponse === 'string') {
        payment = {
          amount: cardToSave.amount,
          paymentMethodId: saveCardResponse,
          source: 'WALLET_SELF',
        };
      } else {
        return saveCardResponse;
      }
    }

    return orderAPI.submitOrder({ cartId, payment, channel });
  },
});
