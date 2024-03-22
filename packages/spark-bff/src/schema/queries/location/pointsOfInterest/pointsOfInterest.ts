import {
  objectType,
  extendType,
  enumType,
  arg,
  nullable,
  stringArg,
} from 'nexus';
import { operations } from 'generated/typings/pointsOfInterestService';

type ServiceType =
  operations['fetchServicesData']['parameters']['query']['serviceType'];
const serviceTypes: ServiceType[] = ['STORE', 'WIFI', 'BUSINESS'];

type DayOfWeek =
  operations['fetchServicesData']['responses']['200']['schema']['locations'][0]['operatingHours'][0]['day'];
const daysOfWeek: DayOfWeek[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const PointOfInterestServiceType = enumType({
  name: 'PointOfInterestServiceType',
  members: serviceTypes,
});

export const PointOfInterestDayOfWeek = enumType({
  name: 'PointOfInterestDayOfWeek',
  members: daysOfWeek,
});

export const PointOfInterestOperatingHours = objectType({
  name: 'PointOfInterestOperatingHours',
  definition(t) {
    t.field('day', {
      type: 'PointOfInterestDayOfWeek',
      description: 'The day of the week',
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

export const PointOfInterestContact = objectType({
  name: 'PointOfInterestContact',
  definition(t) {
    t.nullable.string('name', {
      description: 'The name of the contact',
    });
    t.nullable.string('role', {
      description: 'The role the contact holds',
    });
  },
});

export const PointsOfInterestResponse = objectType({
  name: 'PointsOfInterestResponse',
  definition(t) {
    t.boolean('featured', {
      description:
        'A flag that indicates if the point of inter has been featured by the curators',
    });
    t.string('displayName', {
      description: 'The name of the location',
    });
    t.boolean('isStore', {
      description: 'If the location provides consumer store services.',
    });
    t.boolean('isWifiAvailable', {
      description: 'If the location provides a public WiFi access point',
    });
    t.boolean('isRecyclingOffered', {
      description: 'If the location provides mobile recycling services',
    });
    t.nullable.float('distanceFromLocation', {
      description:
        'An optional value representing the distance in metre from the point of interest to the optionally supplied location in the query URI.',
    });
    t.nullable.string('addressLine1', {
      description:
        'The first line of the address associated with the location, normally a street or building number',
    });
    t.nullable.string('addressLine2', {
      description:
        'The second line of the address associated with the location, normally a street or building number',
    });
    t.nullable.string('suburb', {
      description: 'The suburb where the location resides within',
    });
    t.nullable.string('city', {
      description: 'The city where the location resides within',
    });
    t.float('latitude', {
      description: 'The geographic latitude of the location',
    });
    t.float('longitude', {
      description: 'The geographic longitude of the location',
    });
    t.nullable.string('directions', {
      description:
        'Customer-friendly directions for getting to the location if available',
    });
    t.nullable.string('image', {
      description: 'An image of the point of interest',
    });
    t.nullable.string('phoneNumber', {
      description: 'Primary contact phone number',
    });
    t.nullable.string('emailAddress', {
      description: 'Primary email address',
    });
    t.nullable.list.field('operatingHours', {
      type: 'PointOfInterestOperatingHours',
      description: 'Location operating hours',
    });
    t.nullable.list.field('contacts', {
      type: 'PointOfInterestContact',
      description:
        'n optional array of contact names and their roles associated with this point of interest, for example the manager of the Spark Business Hub.',
    });
  },
});

export const PointsOfInterestInputArgs = {
  serviceType: arg({ type: PointOfInterestServiceType }),
  location: nullable(stringArg()),
};

export const pointsOfInterest = extendType({
  type: 'Location',
  definition(t) {
    t.list.field('pointsOfInterest', {
      type: PointsOfInterestResponse,
      args: PointsOfInterestInputArgs,
      async resolve(
        _,
        { location, serviceType },
        { dataSources: { pointsOfInterestAPI } },
      ) {
        return pointsOfInterestAPI.getServices(location, serviceType);
      },
    });
  },
});
