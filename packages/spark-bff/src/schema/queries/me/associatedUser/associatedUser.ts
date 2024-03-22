import { objectType, enumType, nullable, booleanArg, stringArg } from 'nexus';
import { definitions } from 'generated/typings/accessServiceV2';

type AccessType = definitions['SinglePermissionRecord']['type'];
const accessType: AccessType[] = ['GIVEN', 'INHERITED'];
export const AccessType = enumType({
  name: 'AccessType',
  members: accessType,
  description:
    'indicates whether the access is given (through added or granted access) or inherited (via having high level access to the line)',
});

export const AccessFilterFlags = {
  number: nullable(stringArg()),
  includeNotFound: nullable(booleanArg({ default: false })),
  includeRevoked: nullable(booleanArg({ default: false })),
  includePending: nullable(booleanArg({ default: true })),
};

export const AssociatedUser = objectType({
  name: 'AssociatedUser',
  description:
    'Object representing a Spark user with access to an account or line',
  definition(t) {
    t.string('entityID', {
      description:
        '	The unique id of the Spark Identity which has access (to the account or line)',
    });
    t.field('type', {
      type: AccessType,
      description:
        'indicates whether the access is given (through added or granted access) or inherited (via having high level access to the account)',
    });
    t.string('email', {
      description: 'The Spark email address of the Spark Identity',
    });
    t.nullable.string('firstName', {
      description:
        'The first name the user has set up for their Spark Identity',
    });
    t.nullable.string('lastName', {
      description: 'The last name the user has set up for their Spark Identity',
    });
    t.nullable.string('businessName', {
      description: 'The business name of a Spark Identity',
    });
    t.nullable.string('role', {
      description: 'The role of the access the Spark Identity has',
    });
    t.nullable.boolean('isPending', {
      description:
        'The pending status, true if the access has been requested but not approved',
    });
  },
});
