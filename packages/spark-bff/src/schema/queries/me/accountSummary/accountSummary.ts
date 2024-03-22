import { queryField, objectType, stringArg, nonNull } from 'nexus';

export const AccountSummary = objectType({
  name: 'AccountSummary',
  description: 'object to hold the account summary fields',
  definition(t) {
    t.string('firstName', { description: 'First name' });
    t.string('lastName', { description: 'Last Name' });
  },
});

export const AccountSummaryQueryField = queryField('accountSummary', {
  type: AccountSummary,
  args: {
    accountNumber: nonNull(stringArg()),
  },
  resolve(_, { accountNumber }, { dataSources: { accountServiceAPI } }) {
    return accountServiceAPI.getAccountSummary(accountNumber);
  },
});
