import {
  inputObjectType,
  list,
  nullable,
  objectType,
  queryField,
  stringArg,
} from 'nexus';
import { BalanceManagement } from '../../../common/balanceManagement';

const DestinationCode = objectType({
  name: 'DestinationCode',
  description: 'Destination Code',
  definition(t) {
    t.string('isoAlpha3');
  },
});

const Rate = objectType({
  name: 'Rate',
  description: 'Rate related information',
  definition(t) {
    t.field('accountType', {
      type: BalanceManagement,
    });
    t.string('data');
    t.string('dataOverage');
    t.string('moc');
    t.string('mtc');
    t.string('text');
  },
});

export const Destinations = objectType({
  name: 'Destinations',
  description: 'Destinations related information',
  definition(t) {
    t.string('destinationName');
    t.field('destinationCode', {
      type: DestinationCode,
    });
    t.nullable.string('network');
    t.string('zone');
    t.list.field('rates', {
      type: Rate,
    });
  },
});

export const RoamingRatesResponse = objectType({
  name: 'RoamingRatesResponse',
  description: 'Rates roaming information',
  definition(t) {
    t.list.field('destinations', {
      type: Destinations,
    });
  },
});

export const RoamingRatesInput = inputObjectType({
  name: 'RoamingRatesInput',
  definition(t) {
    t.list.string('destinationIso3');
    t.nullable.field('accountType', {
      type: BalanceManagement,
    });
  },
});

const RoamingRatesArgs = {
  destinationIso3: list(stringArg()),
  accountType: nullable(BalanceManagement),
};

export const RoamingRatesQuery = queryField('roamingRates', {
  type: RoamingRatesResponse,
  args: RoamingRatesArgs,
  description: 'Roaming rates',
  async resolve(_, args, { dataSources: { roamingRatesAPI } }) {
    return roamingRatesAPI.getRoamingRates(args);
  },
});
