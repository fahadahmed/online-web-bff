import { enumType, inputObjectType, objectType, queryField } from 'nexus';
import displaySurchargeMock from './mocks/display-surcharge.mock.json';

export const DisplaySurchargeOperationType = enumType({
  name: 'DisplaySurchargeOperationType',
  members: ['PAY_BILL', 'SETUP_MONTHLY_PAYMENT'],
});

export const DisplaySurchargeInput = inputObjectType({
  name: 'DisplaySurchargeInput',
  description:
    'Array of display surcharge operation types to get the surharge values.',
  definition(t) {
    t.list.field('operationTypes', {
      type: DisplaySurchargeOperationType,
      description: 'The type of payment.',
    });
  },
});

export const CardDisplaySurchargeResponse = objectType({
  name: 'CardDisplaySurchargeResponse',
  description: 'Object having fields for display surcharge results response',
  definition(t) {
    t.string('operationType');
    t.string('masterCard');
    t.string('visa');
    t.string('amex');
    t.string('dinersClub');
    t.list.string('displayText');
  },
});

export const DisplaySurchargeResponse = objectType({
  name: 'DisplaySurchargeResponse',
  description: 'Object having fields for display surcharge results response',
  definition(t) {
    t.list.field('surchargeValues', {
      type: CardDisplaySurchargeResponse,
    });
  },
});

export const displaySurchargeQueryField = queryField('displaySurcharge', {
  type: DisplaySurchargeResponse,
  args: { input: DisplaySurchargeInput },
  resolve(_, { input: { operationTypes } }) {
    const surcharges = operationTypes.map((operationType) => {
      return displaySurchargeMock[operationType];
    });
    return { surchargeValues: surcharges };
  },
});
