import { NexusGenEnums } from 'generated/nexusTypes';

const FALLBACK_COMPONENT = 'UNSUPPORTED';

const BLUE_MARBLE_TYPE_FIELD_COMPONENT_MAP: Record<
  string,
  NexusGenEnums['CheckoutFieldComponent']
> = {
  button: 'SUBMIT_BUTTON',
  checkBox: 'CHECKBOX',
  custom: 'UNSUPPORTED',
  dropdown: 'DROPDOWN',
  hidden: 'HIDDEN',
  radioOption: 'CHOICEBOX',
  textfield: 'TEXT_INPUT',
};

const FIELD_COMPONENT_MAP: Record<
  string,
  NexusGenEnums['CheckoutFieldComponent']
> = {
  accountNumber: 'ACCOUNT_NUMBER',
  addressSearch: 'ADDRESS_SEARCH',
  blackbox: 'BLACKBOX',
  cardInput: 'CARD_INPUT',
  cartTable: 'CART_TABLE',
  changePaymentMethodField: 'CHANGE_PAYMENT_METHOD',
  changePlanComparer: 'CHANGE_PLAN_COMPARER',
  closeButton: 'CLOSE_BUTTON',
  content: 'CONTENT_FIELD',
  copyPersonalDetailsCheckBox: 'COPY_PERSONAL_DETAILS_CHECKBOX',
  datePicker: 'DATEPICKER',
  deliveryItems: 'DELIVERY_ITEMS',
  deliveryOptions: 'DELIVERY_OPTIONS',
  dropdown: 'DROPDOWN',
  emailDeliveryItems: 'EMAIL_DELIVERY_ITEMS',
  footnote: 'FOOTNOTE',
  fullDateInput: 'FULL_DATE_INPUT',
  heading: 'HEADING_FIELD',
  infoBox: 'INFO_BOX_FIELD',
  inlineDatePicker: 'INLINE_DATE_PICKER',
  mobileTransferMessage: 'MOBILE_TRANSFER_MESSAGE',
  monthDateInput: 'MONTH_DATE_INPUT',
  mpdComparer: 'MPD_COMPARER',
  numberInput: 'NUMBER_INPUT',
  paymentAmount: 'PAYMENT_AMOUNT',
  paymentField: 'PAYMENT_FIELD',
  paymentOptions: 'PAYMENT_OPTIONS',
  phoneInput: 'PHONE_INPUT',
  reviewFootNote: 'CART_REVIEW_FOOTNOTE',
  selectNumber: 'NEW_PHONE_NUMBER',
  serviceProvider: 'SERVICE_PROVIDER',
  simNumber: 'SIM_NUMBER',
  storeList: 'STORE_LIST',
  submitButton: 'SUBMIT_BUTTON',
  submitRecommendationButton: 'SUBMIT_RECOMMENDATION_BUTTON',
  subscriptionComparer: 'SUBSCRIPTION_COMPARER',
  toggleButton: 'TOGGLE_BUTTON',
  upfrontPayment: 'UPFRONT_PAYMENT',
};

interface TransformFieldTypeParameter {
  customAttributeComponent?: string;
  type: string;
}

export function transformFieldComponent({
  customAttributeComponent,
  type,
}: TransformFieldTypeParameter): NexusGenEnums['CheckoutFieldComponent'] {
  const defaultComponent =
    BLUE_MARBLE_TYPE_FIELD_COMPONENT_MAP[type] ?? FALLBACK_COMPONENT;

  if (!customAttributeComponent) {
    return defaultComponent;
  }

  const component = FIELD_COMPONENT_MAP[customAttributeComponent];
  return component ?? FALLBACK_COMPONENT;
}
