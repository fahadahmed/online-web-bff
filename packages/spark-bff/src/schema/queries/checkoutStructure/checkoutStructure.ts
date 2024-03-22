import { enumType, objectType, queryField, stringArg } from 'nexus';
import { CartChannel } from '../../common';

export const CheckoutFieldComponent = enumType({
  name: 'CheckoutFieldComponent',
  members: [
    'ACCOUNT_NUMBER',
    'ADDRESS_SEARCH',
    'BENEFITS',
    'BLACKBOX',
    'BUTTON',
    'CARD_INPUT',
    'CART_REVIEW_FOOTNOTE',
    'CART_TABLE',
    'CHANGE_PAYMENT_METHOD',
    'CHANGE_PLAN_COMPARER',
    'CHECKBOX',
    'CHOICEBOX',
    'CLOSE_BUTTON',
    'CONTENT_FIELD',
    'COPY_PERSONAL_DETAILS_CHECKBOX',
    'DATEPICKER',
    'DELIVERY_ITEMS',
    'DELIVERY_OPTIONS',
    'DROPDOWN',
    'EMAIL_DELIVERY_ITEMS',
    'FOOTNOTE',
    'FULL_DATE_INPUT',
    'HEADING_FIELD',
    'HIDDEN',
    'INFO_BOX_FIELD',
    'INLINE_DATE_PICKER',
    'MOBILE_TRANSFER_MESSAGE',
    'MONTH_DATE_INPUT',
    'MPD_COMPARER',
    'MPD_DETAILS',
    'NEW_PHONE_NUMBER',
    'NUMBER_INPUT',
    'PAYMENT_AMOUNT',
    'PAYMENT_BUTTON',
    'PAYMENT_FIELD',
    'PAYMENT_OPTIONS',
    'PHONE_INPUT',
    'REVIEW_BUTTON',
    'SERVICE_PROVIDER',
    'SIM_NUMBER',
    'STORE_LIST',
    'SUBMIT_BUTTON',
    'SUBMIT_RECOMMENDATION_BUTTON',
    'SUBSCRIPTION_COMPARER',
    'TEXT_INPUT',
    'TOGGLE_BUTTON',
    'UPFRONT_PAYMENT',
    'UNSUPPORTED',
  ],
});

const CheckoutFieldDataRef = objectType({
  name: 'CheckoutFieldDataRef',
  definition(t) {
    t.string('id');
    t.string('text');
  },
});

export const CheckoutFieldOption = objectType({
  name: 'CheckoutFieldOption',
  description: "BlueMarble's Dynamic Checkout field option",
  definition(t) {
    t.nullable.string('iconName');
    t.string('label');
    t.nullable.string('sublabel');
    t.string('value');
    t.boolean('visibility');
  },
});

export const FieldRule = objectType({
  name: 'FieldRule',
  description: "BlueMarble's Dynamic Checkout field rules",
  definition(t) {
    t.string('expression');
    t.nullable.string('message');
  },
});

export const Parent = objectType({
  name: 'Parent',
  description:
    'Represents the option that needs to be selected for this field to be shown',
  definition(t) {
    t.string('key');
    t.string('name');
    t.string('value');
  },
});

export const CheckoutField = objectType({
  name: 'CheckoutField',
  description: "BlueMarble's Dynamic Checkout field",
  definition(t) {
    t.nullable.list.field('dataRef', {
      type: CheckoutFieldDataRef,
    });
    t.string('key');
    t.string('name');
    t.field('component', {
      description: 'Indicates which React component to render',
      type: CheckoutFieldComponent,
    });
    t.field('fieldType', {
      deprecation: 'Use component instead',
      type: CheckoutFieldComponent,
    });
    t.nullable.string('label');
    t.nullable.string('infoLayerContentKey');
    t.nullable.string('contentKey');
    t.nullable.list.string('customItems');
    t.nullable.string('filterDate');
    t.nullable.string('placeholder');
    t.nullable.string('defaultValue');
    t.nullable.string('visibilityExpression');
    t.nullable.list.field('options', {
      type: CheckoutFieldOption,
    });
    t.nullable.string('regionId');
    t.nullable.string('componentViewId');
    t.nullable.string('componentViewName');
    t.boolean('shouldMask');
    t.boolean('shouldHideWhenSingleOption');
    t.nullable.field('minimumRule', { type: FieldRule });
    t.nullable.field('maximumRule', { type: FieldRule });
    t.boolean('showInSummary');
    t.nullable.string('summaryLabel');
    t.nullable.string('summaryTemplate');
    t.boolean('required');
    t.nullable.field('parent', { type: Parent });
    t.nullable.field('validationRule', {
      type: FieldRule,
    });
  },
});

export const CheckoutStep = objectType({
  name: 'CheckoutStep',
  description: "BlueMarble's Dynamic Checkout step",
  definition(t) {
    t.string('stepId');
    t.string('stepPath', {
      description:
        'This is a combination of the stepId and the bundle/offer container id that this step is referring to e.g. "setup-7b08884e"',
    });
    t.nullable.string('name');
    t.nullable.string('nameExpression');
    t.nullable.string('bundleId');
    t.nullable.string('itemId');
    t.list.field('fields', {
      type: CheckoutField,
    });
  },
});

export const CheckoutSection = objectType({
  name: 'CheckoutSection',
  description: "BlueMarble's Dynamic Checkout step",
  definition(t) {
    t.string('sectionId');
    t.nullable.string('name');
    t.nullable.string('descriptionContentKey');
    t.list.field('steps', {
      type: CheckoutStep,
    });
  },
});

export const CheckoutStructureQueryResponse = objectType({
  name: 'CheckoutStructureQueryResponse',
  description: "BlueMarble's Dynamic Checkout structure",
  definition(t) {
    t.string('id');
    t.list.field('sections', {
      type: CheckoutSection,
    });
  },
});

export const CheckoutStructureQuery = queryField('checkoutStructure', {
  type: CheckoutStructureQueryResponse,
  args: { cartId: stringArg(), channel: CartChannel },
  description: 'Gets the full Checkout structure',
  async resolve(_, { cartId, channel }, { dataSources: { checkoutAPI } }) {
    return checkoutAPI.getCheckoutStructure({
      cartId,
      channel,
    });
  },
});
