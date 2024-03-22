import {
  objectType,
  enumType,
  stringArg,
  nullable,
  arg,
  queryField,
} from 'nexus';

import { operations } from 'generated/typings/pointsOfInterestService';

type ServiceType =
  operations['fetchServicesData']['parameters']['query']['serviceType'];
const serviceTypes: ServiceType[] = ['STORE', 'WIFI', 'BUSINESS'];

export const StoreListServiceType = enumType({
  name: 'StoreListServiceType',
  members: serviceTypes,
});

export const OperatingHours = objectType({
  name: 'OperatingHours',
  definition(t) {
    t.string('day', {
      description: 'Day of the week',
    });
    t.nullable.string('open', {
      description:
        'The local time that the location is opens for operation on the nominated day',
    });
    t.nullable.string('close', {
      description:
        'The local time that the location is closes for operation on the nominated day',
    });
  },
});

export const Store = objectType({
  name: 'Store',
  definition(t) {
    t.string('id', {
      description: 'unique identifier of the store',
    });
    t.string('name', {
      description: 'Name of the store',
    });
    t.nullable.string('address', {
      description: 'Street Address of the store',
    });
    t.nullable.string('phoneNumber', {
      description: 'Phone number of the store',
    });
    t.nullable.string('storeImage', {
      description: 'URL for the image of the store',
    });
    t.boolean('inStock', {
      description: 'Flag to confirm if product is in stock',
    });
    t.nullable.list.field('operatingHours', {
      type: OperatingHours,
    });
  },
});

export const StoreList = objectType({
  name: 'StoreList',
  definition(t) {
    t.nullable.list.field('storeList', {
      type: Store,
      description: 'List of nearby store to allow Click and Collect',
    });
  },
});

export const StoreListInputArgs = {
  serviceType: arg({ type: StoreListServiceType }),
  location: nullable(stringArg()),
};

export const StoreListQuery = queryField('clickAndCollectStores', {
  type: StoreList,
  args: StoreListInputArgs,
  async resolve(_, __, { dataSources: { pointsOfInterestAPI } }) {
    return pointsOfInterestAPI.getStoreList();
  },
});
