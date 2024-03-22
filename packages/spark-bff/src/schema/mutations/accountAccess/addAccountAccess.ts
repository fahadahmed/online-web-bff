import { enumType, inputObjectType, mutationField, objectType } from 'nexus';

export const AddAccountAccessInput = inputObjectType({
  name: 'AddAccountAccessInput',
  description: 'Input for adding account access',
  definition(t) {
    t.string('accountNumber', {
      description:
        'The account number for the Spark Identity to gain access to',
    });
    t.nullable.string('lineNumber', {
      description: "A valid line number that's billed to the account",
    });
    t.nullable.string('firstName', {
      description: 'The first name of the customer that owns the account',
    });
    t.nullable.string('lastName', {
      description: 'The last name of the customer that owns the account',
    });
    t.nullable.string('businessName', {
      description: 'The business name of the customer that owns the account',
    });
    t.nullable.string('password', {
      description:
        'The password supplied to get access if it is a password protected account',
    });
  },
});

const AddAccountAccessNextSection = enumType({
  name: 'AddAccountAccessNextSection',
  members: [
    'BusinessNameEntry',
    'FullNameEntry',
    'LineNumberEntry',
    'PasswordEntry',
  ],
});

export const AddAccountAccessResponse = objectType({
  name: 'AddAccountAccessResponse',
  description: 'Response from the add account access mutation',
  definition(t) {
    t.implements('GenericMutationResponse');
    t.nullable.field('nextStep', {
      type: AddAccountAccessNextSection,
      description: 'The next form section if more information is required',
    });
    t.nullable.string('title', {
      description: 'The title of the success response if applicable',
    });
  },
});

export const AddAccountAccess = mutationField('addAccountAccess', {
  type: AddAccountAccessResponse,
  description: 'Creates account access for a Spark identity',
  args: { input: AddAccountAccessInput },
  async resolve(_, { input }, { dataSources: { accessAPI } }) {
    return accessAPI.addAccountAccess(input);
  },
});
