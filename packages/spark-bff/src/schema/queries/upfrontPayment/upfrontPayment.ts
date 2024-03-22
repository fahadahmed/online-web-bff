import { objectType, queryField, stringArg } from 'nexus';
import { CartChannel } from '../../common';

export const UpfrontPaymentItem = objectType({
  name: 'UpfrontPaymentItem',
  definition(t) {
    t.string('itemId');
    t.string('title');
    t.string('description');
    t.float('price');
    t.string('imagePath');
  },
});

export const UpfrontPaymentResponse = objectType({
  name: 'UpfrontPaymentResponse',
  description:
    'A representation of the required upfront payments that should be shown on the Shop Credit Check / Upfront Payment page.',
  definition(t) {
    t.list.field('items', { type: UpfrontPaymentItem });
    t.float('monthlyIfpAmount');
    t.float('requiredUpfrontAmount');
  },
});

export const upfrontPaymentQuery = queryField('upfrontPayment', {
  type: UpfrontPaymentResponse,
  args: { cartId: stringArg(), channel: CartChannel },
  description: `Get all upfront payment details to show on Shop's Credit Check / Upfront payment page`,
  async resolve() {
    // this is mocked data until DESL swagger is ready for integration
    return {
      items: [
        {
          itemId: '512aab13-af1b-4a69-942d-083d6a23145f',
          title: 'iPhone 12 64GB',
          description: 'Blue',
          price: 52.75,
          imagePath:
            '/content/dam/spark/images/nui-graphics/static/EndlessPlanIcons/endless-plan-icon-child-1.png',
        },
      ],
      monthlyIfpAmount: 52.75,
      requiredUpfrontAmount: 949.5,
    };
  },
});
