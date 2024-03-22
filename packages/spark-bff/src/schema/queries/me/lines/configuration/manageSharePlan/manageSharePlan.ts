import { enumType, extendType, objectType } from 'nexus';
import { definitions } from 'generated/typings/lineConfigurationService';

const groupCapMemberTypes: definitions['Member']['type'][] = [
  'Leader',
  'MobileSharer',
];

const groupCapMemberUnits: definitions['Member']['unit'][] = ['GB', 'MB'];

const LineShareGroupCapMemberType = enumType({
  name: 'LineShareGroupCapMemberType',
  members: groupCapMemberTypes,
});

const LineShareGroupCapMemberUnit = enumType({
  name: 'LineShareGroupCapMemberUnit',
  members: groupCapMemberUnits,
});

const LineShareTotalData = objectType({
  name: 'LineShareTotalData',
  definition(t) {
    t.float('value', {
      description: 'Total data consumed.',
    });
    t.field('unit', {
      type: LineShareGroupCapMemberUnit,
      description: 'Unit of value.',
    });
  },
});

const LineShareGroupCapMember = objectType({
  name: 'LineShareGroupCapMember',
  definition(t) {
    t.string('serviceId', {
      description: 'The service/connection number for the group member.',
    });
    t.field('type', {
      type: LineShareGroupCapMemberType,
      description: 'The unit of time that the usage data is aggregated by',
    });
    t.string('status', {
      description:
        'The status of the group member.  Only expect Active or Pending',
    });
    t.boolean('isUncapped', {
      description:
        'Indicates if the cap is set to unlimited.  If unlimited the value will be true.',
    });
    t.nullable.string('capValue', {
      description:
        'The value of the sharer cap, it the share group member is capped. Can be 0 or any number. Optional, but required is isUncapped is false.',
    });
    t.nullable.string('usedValue', {
      description:
        'The amount used by the sharer. Can be 0 or any number. Optional but expected, even if it is 0',
    });
    t.nullable.field('unit', {
      type: LineShareGroupCapMemberUnit,
      description: 'The units of the value',
    });
  },
});

const LineShareGroupCaps = objectType({
  name: 'LineShareGroupCaps',
  definition(t) {
    t.string('id', {
      description: 'The Siebel reference id of the group.',
    });
    t.string('name', {
      description: 'The name of the group.',
    });
    t.field('totalData', {
      type: LineShareTotalData,
      description:
        'An object providing the total data that group has access to.',
    });
    t.list.field('members', {
      type: LineShareGroupCapMember,
      description: 'An array of the members which are included in the group.',
    });
  },
});

export const LineWithShareGroupCaps = extendType({
  type: 'Line',
  definition(t) {
    t.field('group', {
      type: LineShareGroupCaps,
      async resolve(
        { lineNumber },
        _,
        { dataSources: { lineConfigurationAPI } },
      ) {
        return lineConfigurationAPI.getShareGroupCaps(lineNumber);
      },
    });
  },
});
