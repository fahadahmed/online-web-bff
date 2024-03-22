import { objectType, extendType, enumType, nullable, arg } from 'nexus';
import { operations } from 'generated/typings/pointsOfInterestService';

type OutageType =
  operations['fetchOutageData']['parameters']['query']['outageType'];
const outageTypes: OutageType[] = ['MAINTENANCE', 'OUTAGE'];

type ServiceAffected =
  operations['fetchOutageData']['parameters']['query']['serviceAffected'];
const servicesAffected: ServiceAffected[] = [
  'INTERNET',
  'MOBILE',
  'LANDLINE',
  'OTHERS',
];

type OutageData =
  operations['fetchOutageData']['responses']['200']['schema']['outages'];

type Status = OutageData[0]['status'];
const statusTypes: Status[] = ['CURRENT', 'RESOLVED', 'FIXED'];

export const PointsOfInterestOutageType = enumType({
  name: 'PointsOfInterestOutageType',
  members: outageTypes,
});

export const ServicesAffectedByOutageType = enumType({
  name: 'ServicesAffectedByOutageType',
  members: servicesAffected,
});

export const OutageStatus = enumType({
  name: 'OutageStatus',
  members: statusTypes,
});

export const PointsOfInterestOutage = objectType({
  name: 'PointsOfInterestOutage',
  definition(t) {
    t.string('displayName', {
      description: 'The display name of the outage',
    });
    t.field('outageType', {
      type: PointsOfInterestOutageType,
      description: 'The type of the outage.',
    });
    t.string('category', {
      description: 'The category of the outage.',
    });
    t.field('serviceAffected', {
      type: ServicesAffectedByOutageType,
      description: 'The description of the service affected.',
    });
    t.nullable.field('status', {
      type: OutageStatus,
      description: 'The status of the outage describing.',
    });
    t.nullable.string('description', {
      description: 'Description of the outage.',
    });
    t.float('longitude', {
      description:
        'Used to geolocate the outage location in maps , will be positive due to NZ geo location.',
    });
    t.float('latitude', {
      description:
        'Used to geolocate the exact outage location in maps, will be negative due to NZ geo location',
    });
    t.nullable.string('startDateTime', {
      description: 'The start time of the outage, this may be the time logged.',
    });
    t.nullable.string('endDateTime', {
      description: 'The end time of when the outage was resolved.',
    });
  },
});

export const OutagesInputArgs = {
  outageType: nullable(arg({ type: PointsOfInterestOutageType })),
  serviceAffected: arg({ type: ServicesAffectedByOutageType }),
};

export const outagesPointsOfInterest = extendType({
  type: 'Location',
  definition(t) {
    t.list.field('outages', {
      type: PointsOfInterestOutage,
      args: OutagesInputArgs,
      async resolve(
        _,
        { outageType, serviceAffected },
        { dataSources: { pointsOfInterestAPI } },
      ) {
        return pointsOfInterestAPI.getOutages(outageType, serviceAffected);
      },
    });
  },
});
