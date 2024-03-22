import { enumType, inputObjectType, mutationField, objectType } from 'nexus';
import { definitions } from 'generated/typings/lineConfigurationService';

const smartCapUnitMembers: definitions['Cap']['unit'][] = [
  'GB',
  'MB',
  'DOLLAR',
];

const smartCapTypeMembers: definitions['SmartCapData']['type'][] = [
  'SHARER_LIMIT',
  'LOCAL',
  'ROAMING',
];

const SmartCapUnit = enumType({
  name: 'SmartCapUnit',
  members: smartCapUnitMembers,
  description: 'The units of the value.',
});

const SmartCapType = enumType({
  name: 'SmartCapType',
  members: smartCapTypeMembers,
  description: 'The type of smart cap being applied.',
});

const DataCap = inputObjectType({
  name: 'DataCap',
  definition(t) {
    t.float('value', {
      description: 'The new value of the smartcap.',
    });
    t.nullable.field('unit', {
      type: SmartCapUnit,
      description: 'The units of the value.',
    });
  },
});

const UpdateSmartCapInput = inputObjectType({
  name: 'UpdateSmartCapInput',
  definition(t) {
    t.string('lineNumber', {
      description: 'The line number to which smart cap is requested.',
    });
    t.nullable.field('type', {
      type: SmartCapType,
      description: 'The type of smart cap being applied.',
    });
    t.nullable.field('cap', {
      type: DataCap,
    });
    t.nullable.boolean('isUncapped');
  },
});

export const UpdateSmartCapResponse = objectType({
  name: 'UpdateSmartCapResponse',
  description: 'List of Messages',
  definition(t) {
    t.implements('GenericMutationResponse');
  },
});

export const UpdateSmartCap = mutationField('updateSmartCap', {
  type: UpdateSmartCapResponse,
  args: { input: UpdateSmartCapInput },
  async resolve(_, { input }, { dataSources: { lineConfigurationAPI } }) {
    return lineConfigurationAPI.updateSmartcap(input);
  },
});
