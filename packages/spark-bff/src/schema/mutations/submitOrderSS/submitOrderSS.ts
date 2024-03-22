import { inputObjectType, mutationField, objectType } from 'nexus';
import { CartChannel } from '../../common';
import { SubmitOrderPayment } from '../../../datasources/shop/order/helpers/submitOrder.helper';
import { WalletPaymentMethodSource } from '../../queries';

const NewCardInput = inputObjectType({
  name: 'NewCardInput',
  definition(t) {
    t.nullable.string('cardholderName');
    t.boolean('shouldSaveCard');
    t.string('token');
  },
});

const ExistingCardInput = inputObjectType({
  name: 'ExistingCardInput',
  definition(t) {
    t.string('paymentMethodId');
    t.field('paymentMethodSource', {
      type: WalletPaymentMethodSource,
    });
  },
});

const SubmitOrderSSInput = inputObjectType({
  name: 'SubmitOrderSSInput',
  definition(t) {
    t.string('cartId', {
      description: 'Cart ID for which the order has to be submitted',
    });
    t.float('amount');
    t.field('channel', {
      type: CartChannel,
    });
    t.nullable.string('lineNumber');
    t.nullable.boolean('isSplitPayment');
    t.nullable.field('newCard', {
      type: NewCardInput,
    });
    t.nullable.field('existingCard', {
      type: ExistingCardInput,
    });
    t.nullable.boolean('prepaidBalance');
    t.nullable.boolean('account');
    t.nullable.boolean('voucher');
    t.nullable.boolean('cancel');
  },
});

export const SubmitOrderSSResponse = objectType({
  name: 'SubmitOrderSSResponse',
  description: 'Submit Order Response',
  definition(t) {
    t.nullable.string('orderNumber');
    t.nullable.string('confirmationEmailId');
    t.implements('GenericMutationResponse');
  },
});

export const SubmitOrderSS = mutationField('submitOrderSS', {
  type: SubmitOrderSSResponse,
  args: { input: SubmitOrderSSInput },
  async resolve(
    _,
    { input },
    { dataSources: { orderAPI, walletServiceAPI, paymentServiceAPI } },
  ) {
    const { cartId, amount, channel, lineNumber, isSplitPayment } = input;

    const registerCard = async (paymentMethodId: string) => {
      return paymentServiceAPI.registerCard(lineNumber, {
        paymentMethodId,
        source: 'WALLET_SELF',
      });
    };

    let payment: SubmitOrderPayment;

    switch (true) {
      case 'account' in input:
      case 'prepaidBalance' in input: {
        payment = {
          amount,
          source: 'ACCOUNT',
        };
        break;
      }

      case 'voucher' in input: {
        payment = {
          amount,
          source: 'VOUCHER',
        };
        break;
      }

      case 'existingCard' in input: {
        const { existingCard } = input;

        if (existingCard.paymentMethodSource === 'WALLET_SELF') {
          const registerCardResponse = await registerCard(
            existingCard.paymentMethodId,
          );
          if (!registerCardResponse.success) {
            return registerCardResponse;
          }

          payment = {
            amount,
            source: 'WALLET_SELF',
            paymentMethodId: existingCard.paymentMethodId,
          };
        } else {
          payment = {
            amount,
            source: 'DIRECT',
            paymentMethodId: existingCard.paymentMethodId,
          };
        }
        break;
      }

      case 'newCard' in input: {
        const { newCard } = input;

        if (newCard.shouldSaveCard) {
          const paymentMethodId = await walletServiceAPI.saveCard({
            cardholderName: newCard.cardholderName,
            token: newCard.token,
            isPreferred: true,
          });
          if (typeof paymentMethodId !== 'string') {
            return paymentMethodId;
          }

          const registerCardResponse = await registerCard(paymentMethodId);
          if (!registerCardResponse.success) {
            return registerCardResponse;
          }

          payment = {
            amount,
            source: 'WALLET_SELF',
            paymentMethodId,
          };
        } else {
          payment = {
            amount,
            source: 'NEW_CARD',
            secureTransactionToken: newCard.token,
          };
        }

        break;
      }

      case 'cancel' in input: {
        payment = {
          amount: 0,
          source: 'DIRECT',
        };
        break;
      }

      default: {
        payment = null;
      }
    }

    return orderAPI.submitOrder({ cartId, payment, channel, isSplitPayment });
  },
});
