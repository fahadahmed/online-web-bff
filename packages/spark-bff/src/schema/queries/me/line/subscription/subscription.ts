import { enumType, extendType, objectType, stringArg } from 'nexus';
import { definitions } from 'generated/typings/lineSubscriptionsService';

type AutoRenew = definitions['SubscriptionsProductResponse']['autorenew'];
type Cta = definitions['Cta']['type'] | 'SWITCH'; // TODO: Add switch to swagger
type Status = definitions['Status']['type'];

const LineSubscriptionAutoRenewMembers: AutoRenew[] = ['ON', 'OFF', 'GR'];

const LineSubscriptionAutoRenew = enumType({
  name: 'LineSubscriptionAutoRenew',
  members: LineSubscriptionAutoRenewMembers,
});

const LineSubscriptionStatusMembers: Status[] = [
  'ACTIVE',
  'CANCELLED',
  'NOT_ACTIVE',
  'PROCESSING_ACTIVATION',
  'PROCESSING_ORDER_ADD',
  'PROCESSING_ORDER_AUTORENEW_CANCEL',
  'PROCESSING_ORDER_AUTORENEW_RESUME',
  'PROCESSING_ORDER_CHANGEPAYMENTMETHOD',
  'PROCESSING_ORDER_CHANGEPLAN',
  'TERMINATED',
];

export const LineSubscriptionStatus = enumType({
  name: 'LineSubscriptionStatus',
  members: LineSubscriptionStatusMembers,
});

const LineSubscriptionOffer = objectType({
  name: 'LineSubscriptionOffer',
  definition(t) {
    t.string('offerId', {
      description:
        'The BlueMarble unique identifier of the subscription component.	',
    });
    t.string('name', {
      description: 'The BlueMarble offer name of the subscription component.',
    });
    t.string('productInstanceId', {
      description: 'The Siebel product instance id of the offer.',
    });
  },
});

const LineSubscriptionBundleOffer = objectType({
  name: 'LineSubscriptionBundleOffer',
  definition(t) {
    t.string('bundleOfferId', {
      description: 'The BlueMarble unique identifier of the bundle.',
    });
    t.nullable.string('name', {
      description: 'The BlueMarble offer name of the bundle.',
    });
    t.string('productInstanceId', {
      description: 'The Siebel product instance id of the bundle.',
    });
  },
});

const SubscriptionStatus = objectType({
  name: 'SubscriptionStatus',
  definition(t) {
    t.field('type', {
      type: LineSubscriptionStatus,
      description: 'The status of the subscription.',
    });
    t.nullable.string('label', {
      description: 'The label of the subscription.',
    });
  },
});

const LineSubscriptionCtaMembers: Cta[] = [
  'ACTIVATE',
  'ACTIVATE_RETRY',
  'CANCEL',
  'CHANGE_PAYMENT_METHOD',
  'EDIT_PARTNER_ACCOUNT',
  'REACTIVATE',
  'RESUME',
  'SWITCH',
];

const LineSubscriptionCtaType = enumType({
  name: 'LineSubscriptionCta',
  members: LineSubscriptionCtaMembers,
});

const SubscriptionCta = objectType({
  name: 'SubscriptionCta',
  definition(t) {
    t.field('type', {
      type: LineSubscriptionCtaType,
      description: 'The Cta type.',
    });
    t.string('label', {
      description: 'The Cta label.',
    });
    t.nullable.string('webLink', {
      description:
        'The web link if opening external tab or webview of the Cta.',
    });
  },
});

export const LineSubscriptionProperties = objectType({
  name: 'LineSubscription',
  definition(t) {
    t.field('offer', {
      type: LineSubscriptionOffer,
    });
    t.nullable.field('bundleOffer', {
      type: LineSubscriptionBundleOffer,
    });
    t.string('assetStartDate', {
      description: 'The date-time the asset was initially active in Siebel.	',
    });
    t.string('accountNumber', {
      description:
        'The Siebel account number of which the Subscription product is associated with.',
    });
    t.string('lineNumber', {
      description:
        'The Siebel line number of which the Subscription product is associated to.',
    });
    t.field('status', {
      type: SubscriptionStatus,
      description: 'The status of the subscription',
    });
    t.nullable.int('lockTtl', {
      description:
        'The lock TTL (in seconds) for the correlating PROCESSING status.',
    });
    t.nullable.string('nextRenewalDate', {
      description:
        'The date-time when the subscription will be next renewed based on the renewal date root product.	',
    });
    t.nullable.string('subscriptionEndDate', {
      description:
        'The date-time when the subscription will end if the subscription is cancelled based on the renewal date of the bundle offer.',
    });
    t.nullable.string('username', {
      description:
        'The username used by the customer to activate the subscription (from the third party partner).',
    });
    t.nullable.list.field('ctas', {
      type: SubscriptionCta,
      description:
        'The Call To Actions (CTAs) available for the given Subscription.',
    });
    t.nullable.field('autoRenew', {
      type: LineSubscriptionAutoRenew,
      description: 'Auto renew status of the asset from Siebel',
    });
  },
});

export const LineSubscription = extendType({
  type: 'Line',
  definition(t) {
    t.field('subscription', {
      type: LineSubscriptionProperties,
      args: {
        productInstanceId: stringArg(),
      },
      description:
        'Returns details of subscription component offer for a given SparkId. Includes billing information and CTAs.',
      resolve(
        { lineNumber },
        { productInstanceId },
        { dataSources: { lineSubscriptionsServiceAPI } },
      ) {
        return lineSubscriptionsServiceAPI.getEligibleSubscription(
          lineNumber,
          productInstanceId,
        );
      },
    });
  },
});
