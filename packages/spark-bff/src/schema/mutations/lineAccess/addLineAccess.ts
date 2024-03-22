import { enumType, inputObjectType, mutationField, objectType } from 'nexus';

export const AddLineAccessInput = inputObjectType({
  name: 'AddLineAccessInput',
  description: 'Input for adding line access',
  definition(t) {
    t.string('lineNumber', {
      description: 'The line number to which access is requested',
    });
    t.field('balanceManagement', {
      type: 'BalanceManagement',
      description: 'The type of line, either POSTPAID or PREPAID',
    });
    t.nullable.string('authorisationCode', {
      description: 'A SMS-sent code to authorise this access addition',
    });
  },
});

const AddLineAccessNextSection = enumType({
  name: 'AddLineAccessNextSection',
  members: ['AuthorisationCodeEntry'],
});

export const AddLineAccessResponse = objectType({
  name: 'AddLineAccessResponse',
  description: 'Response from the add line access mutation',
  definition(t) {
    t.implements('GenericMutationResponse');
    t.nullable.field('nextStep', {
      type: AddLineAccessNextSection,
      description: 'The next form section if more information is required',
    });
    t.nullable.string('title', {
      description: 'The title of the success response if applicable',
    });
  },
});

export const AddLineAccess = mutationField('addLineAccess', {
  type: 'AddLineAccessResponse',
  description: 'Creates line access for a Spark identity',
  args: { input: AddLineAccessInput },
  async resolve(
    _,
    { input: { lineNumber, balanceManagement, authorisationCode } },
    { dataSources: { accessAPI } },
  ) {
    return accessAPI.addLineAccess(
      lineNumber,
      balanceManagement,
      authorisationCode,
    );
  },
});
