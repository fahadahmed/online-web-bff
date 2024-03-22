import { inputObjectType, objectType, mutationField } from 'nexus';

export const UpdateNameInput = inputObjectType({
  name: 'UpdateNameInput',
  description: 'Input for changing profile name on an account',
  definition(t) {
    t.string('firstName', {
      description:
        'First name taken from the Spark Identity of the current user.',
    });
    t.string('lastName', {
      description:
        'Last name taken from the Spark Identity of the current user.',
    });
  },
});

export const UpdateNameResponse = objectType({
  name: 'UpdateNameResponse',
  definition(t) {
    t.implements('GenericMutationResponse');
  },
});

export const UpdateName = mutationField('updateName', {
  type: UpdateNameResponse,
  description: 'changes profile name  to account',
  args: { input: UpdateNameInput },
  async resolve(_, params, { dataSources: { identityServiceAPI } }) {
    const { input } = params;
    return identityServiceAPI.updateName(input);
  },
});
