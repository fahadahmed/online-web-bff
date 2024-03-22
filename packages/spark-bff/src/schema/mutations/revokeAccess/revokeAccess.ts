import { enumType, inputObjectType, mutationField, objectType } from 'nexus';
import { definitions } from 'generated/typings/accessServiceV2';

type SingleAccessRecordType = definitions['SingleAccessRecord']['type'];
const singleAccessRecordType: SingleAccessRecordType[] = ['Line', 'Account'];
const RevokeAccessType = enumType({
  name: 'RevokeAccessType',
  members: singleAccessRecordType,
});

export const RevokeAccessInput = inputObjectType({
  name: 'RevokeAccessInput',
  description: 'Input for revoking access',
  definition(t) {
    t.string('entityID', {
      description:
        'uuid from the account or line access query, depending on which user this edit access was selected for',
    });
    t.field('type', {
      type: RevokeAccessType,
      description:
        'ACCOUNT or LINE depending on the component user edit was selected from',
    });
    t.string('number', {
      description:
        'account or line number depending on the component user edit was selected from',
    });
  },
});

export const RevokeAccessResponse = objectType({
  name: 'RevokeAccessResponse',
  description: 'Response from the revoke access mutation',
  definition(t) {
    t.implements('GenericMutationResponse');
  },
});

export const RevokeAccess = mutationField('revokeAccess', {
  type: RevokeAccessResponse,
  description: 'Revoke account or line acceess',
  args: { input: RevokeAccessInput },
  async resolve(_, { input }, { dataSources: { accessAPI } }) {
    return accessAPI.revokeAccess(input);
  },
});
