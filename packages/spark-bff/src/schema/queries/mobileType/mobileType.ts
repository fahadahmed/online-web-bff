import { objectType, queryField, stringArg } from 'nexus';

export const MobileType = objectType({
  name: 'MobileType',
  description:
    "Verifies if a number is a Spark mobile by checking whether it's prepaid or postpaid",
  definition(t) {
    t.boolean('isValidMobile', {
      description:
        'Whether the number entered is a valid Spark mobile number or not',
    });
  },
});

export const mobileTypeQueryField = queryField('mobileType', {
  type: MobileType,
  args: { lineNumber: stringArg() },
  async resolve(_, { lineNumber }, { dataSources: { resourceAPI } }) {
    return resourceAPI.getMobileType(lineNumber);
  },
});
