/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/v1/location/pointsofinterest/outages': {
    get: operations['fetchOutageData'];
  };
  '/v1/location/pointsofinterest/services': {
    get: operations['fetchServicesData'];
  };
}

export interface definitions {
  OutageDataResponse: definitions['Response'] & {
    /** An array of the outage data objects to be presented */
    outages: definitions['OutageData'][];
  };
  OutageData: {
    /** The display name of the outage */
    displayName: string;
    /** The type of the outage, this is based on where we retrieve then information from: all_network_events.xml or maintenance.xml */
    outageType: 'MAINTENANCE' | 'OUTAGE';
    /** The category of the outage */
    category: 'unplanned_outage' | 'planned_outage';
    /** The description of the service affected */
    serviceAffected: 'MOBILE' | 'INTERNET' | 'LANDLINE' | 'OTHERS';
    /** The status of the outage describing */
    status?: 'CURRENT' | 'RESOLVED' | 'FIXED';
    /** Description of the outage */
    description?: string;
    /** Used to geolocate the outage location in maps , will be positive due to NZ geo location */
    longitude: number;
    /** Used to geolocate the exact outage location in maps, will be negative due to NZ geo location */
    latitude: number;
    /** The start time of the outage, this may be the time logged */
    startDateTime?: string;
    /** The end time of when the outage was resolved */
    endDateTime?: string;
  };
  ServiceLocationDataResponse: definitions['Response'] & {
    /** A list of the locations to be presented. Mandatory but the list may be empty. */
    locations: definitions['LocationData'][];
  };
  LocationData: {
    /** Name of the location to be presented */
    displayName: string;
    /** Provides the Brand identifier to filter locations when querying from different brands */
    brand: 'SPARK' | 'SKINNY' | 'OTHER';
    /** Dictates if the location is a store */
    store: boolean;
    /** Dictates if the location is a businessHub */
    businessHub: boolean;
    /** Dictates if the location provides wifi */
    wifi: boolean;
    /** Dictates if the location provides mobile recycling services */
    recycle: boolean;
    /** Value representing the distance in metres (as the crow flies) from the point of interest to the optionally supplied location in the query URI. */
    distanceFromLocation?: number;
    /** First line of the address normally a street or building number */
    addressLine1?: string;
    /** Second line of the address normally a street or building number */
    addressLine2?: string;
    /** Suburb of the point of interest */
    suburb?: string;
    /** City of the point of interest */
    city?: string;
    /** Used to geolocate the exact service location in maps , will be positive due to NZ geo location */
    longitude: number;
    /** Used to geolocate the exact service location in maps, will be negative due to NZ geo location */
    latitude: number;
    /** Describes how to get to the location */
    directions?: string;
    /** The url of the image of the point of interest */
    image?: string;
    /** Phone Number of the point of interest */
    phoneNumber?: string;
    /** An optional array of contact names and their roles associated with this point of interest. */
    contacts?: definitions['Contacts'][];
    /** A list of operating hours object which indicates what times the stores will be open. This is optional as locations such as WIFI hotspots do not have operating hours. */
    operatingHours?: definitions['OperatingHour'][];
    /** A flag that indicates if the point of inter has been featured by the curators. */
    featured: boolean;
    /** The optional primary email address for the point of interest. */
    emailAddress?: string;
  };
  OperatingHour: {
    /** The day of the week */
    day?:
      | 'Monday'
      | 'Tuesday'
      | 'Wednesday'
      | 'Thursday'
      | 'Friday'
      | 'Saturday'
      | 'Sunday';
    /** The open times of the day.  This value can be empty and is normally supplied in HH:MM:SS format which is managed by AEM. */
    open?: string;
    /** The closed times of the day. This value can be empty and is normally supplied in HH:MM:SS format which is managed by AEM. */
    close?: string;
  };
  Contacts: {
    /** The name of the contact. */
    name?: string;
    /** The role the contact holds. */
    role?: string;
  };
  Response: {
    /** List of Messages */
    messages: definitions['Message'][];
  };
  Message: {
    message: string;
    code: number;
  };
}

export interface operations {
  fetchOutageData: {
    parameters: {
      query: {
        /** The Type of outage the users are wanting to filter by. */
        outageType?: 'OUTAGE' | 'MAINTENANCE';
        /** The Type of service affected the users are wanting to filter by. */
        serviceAffected?: 'INTERNET' | 'LANDLINE' | 'MOBILE' | 'OTHERS';
      };
    };
    responses: {
      /** The outage data has been successfully fetched. */
      200: {
        schema: definitions['OutageDataResponse'];
      };
      /** BAD REQUEST */
      400: {
        schema: definitions['Response'];
      };
      /** There are no outages found for outage type or service affected or both (outage type & service affected). */
      404: {
        schema: definitions['Response'];
      };
      /** INTERNAL SERVER ERROR, General failure (e.g. the system that stores outage data is down). */
      500: {
        schema: definitions['Response'];
      };
    };
  };
  fetchServicesData: {
    parameters: {
      query: {
        /** The type of location the users are wanting to return. */
        serviceType?: 'STORE' | 'WIFI' | 'RECYCLE' | 'BUSINESS';
        /** The brand for which the locations are returned. */
        brand?: 'SPARK' | 'SKINNY' | 'OTHER';
        /** The geographic latitude and longitude co-ordinates to centre the filter. */
        location?: string;
        /** The radius of the search filter in metres centred around the co-ordinates supplied in the location query parameter. */
        radius?: number;
      };
    };
    responses: {
      /** The service location data has been successfully fetched. */
      200: {
        schema: definitions['ServiceLocationDataResponse'];
      };
      /** BAD REQUEST */
      400: {
        schema: definitions['Response'];
      };
      /** The requested ServiceType or Brand was not found, internal error code 4102 or 4107 or 4108 respectively. */
      404: {
        schema: definitions['Response'];
      };
      /** INTERNAL SERVER ERROR, General failure (e.g. the system that stores outage data is down). */
      500: {
        schema: definitions['Response'];
      };
    };
  };
}
