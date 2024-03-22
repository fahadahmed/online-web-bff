import { objectType, inputObjectType, mutationField } from 'nexus';

export const DeleteAutoTopupResponse = objectType({
  name: 'DeleteAutoTopupResponse',
  definition(t) {
    t.implements('GenericMutationResponse');
  },
});

export const DeleteAutoTopupInput = inputObjectType({
  name: 'DeleteAutoTopupInput',
  description: 'input object having fields for removing auto topup.',
  definition(t) {
    t.string('lineNumber', {
      description:
        'The prepay line number whose auto-topup needs to be stopped and the user has access to.',
    });
  },
});

export const DeleteAutoTopup = mutationField('deleteAutoTopup', {
  type: DeleteAutoTopupResponse,
  description: 'Delete Auto Topup.',
  args: { input: DeleteAutoTopupInput },
  resolve(_, { input }, { dataSources: { topupAPI } }) {
    return topupAPI.deleteAutoTopup(input);
  },
});
