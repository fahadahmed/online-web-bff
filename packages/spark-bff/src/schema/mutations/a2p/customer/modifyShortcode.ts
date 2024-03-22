import { enumType, inputObjectType, mutationField, objectType } from 'nexus';
import { ContextType } from 'types';

export const A2PModifyShortcodeStatus = enumType({
  name: 'A2PModifyShortcodeStatus',
  members: ['INACTIVE'],
  description: 'Modify shortcode status',
});

export const A2PModifyShortcodeRequest = inputObjectType({
  name: 'A2PModifyShortcodeRequest',
  description:
    'Request to modify a shortcode status by creating a new service request',
  definition(t) {
    t.string('customerNumber', { description: 'Customer number' });
    t.string('shortcodeNumber', { description: 'Shortcode number' });
    t.field('status', {
      description: 'New shortcode status',
      type: A2PModifyShortcodeStatus,
    });
  },
});

export const A2PModifyShortcodeResponse = objectType({
  name: 'A2PModifyShortcodeResponse',
  description:
    'Response to modify a shortcode status by creating a new service request',
  definition(t) {
    t.implements('GenericMutationResponse');
  },
});

export const a2pModifyShortcode = mutationField('a2pModifyShortcode', {
  type: A2PModifyShortcodeResponse,
  description: 'Modify a shortcode',
  args: {
    input: A2PModifyShortcodeRequest,
  },
  resolve(_, { input }, { dataSources: { a2pCustomerAPI } }: ContextType) {
    return a2pCustomerAPI.modifyShortcode(input);
  },
});
