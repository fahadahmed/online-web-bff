import { objectType, extendType, stringArg } from 'nexus';

export const AddressSuggestion = objectType({
  name: 'AddressSuggestion',
  description: 'Possible address suggestion that match the partial',
  definition(t) {
    t.string('label', {
      description: 'Full address',
    });
    t.string('elid', {
      description: 'Unique address identifier',
    });
  },
});

export const AddressDetail = objectType({
  name: 'AddressDetail',
  description: 'Possible address suggestion that match the partial',
  definition(t) {
    t.string('elid', {
      description: 'Unique address identifier',
    });
    t.string('addressLine1', {
      description: 'The mandatory first line of the address at the location',
    });
    t.nullable.string('addressLine2', {
      description: 'The optional second line of the address at the location',
    });
    t.nullable.string('addressLine3', {
      description: 'The optional third line of the address at the location',
    });
    t.nullable.string('addressLine4', {
      description: 'The optional fourth line of the address at the location',
    });
    t.float('latitude', {
      description: 'The standard latitude of the location',
    });
    t.float('longitude', {
      description: 'The standard longitude of the location',
    });
  },
});

export const AddressSuggestionArgs = {
  partialAddress: stringArg(),
};

export const AddressDetailArgs = {
  elid: stringArg(),
};

export const AddressResponse = objectType({
  name: 'AddressResponse',
  definition(t) {
    t.list.field('suggestions', {
      type: AddressSuggestion,
      description: 'Location auto complete',
      args: AddressSuggestionArgs,
      async resolve(_, { partialAddress }, { dataSources: { addressAPI } }) {
        return addressAPI.getAddressSuggestions(partialAddress);
      },
    });
    t.field('detail', {
      type: AddressDetail,
      description:
        'Formatted name and GPS co-ordinates for an address identified by its ELID',
      args: AddressDetailArgs,
      async resolve(_, { elid }, { dataSources: { addressAPI } }) {
        return addressAPI.getAddressDetail(elid);
      },
    });
  },
});

export const address = extendType({
  type: 'Location',
  definition(t) {
    t.field('address', {
      type: AddressResponse,
    });
  },
});
