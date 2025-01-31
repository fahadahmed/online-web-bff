/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/v1/marketing/profile/me': {
    get: operations['getProfileData'];
  };
}

export interface definitions {
  ProfileResponse: definitions['Response'] & {
    /** An array containing all the profile data as key value pairs. */
    profileData: definitions['KeyValuePair'][];
  };
  KeyValuePair: {
    /** This contains the key name and is named according to W3C standards. */
    key: string;
    /** Provides the value of the key. */
    value: string;
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
  getProfileData: {
    parameters: {};
    responses: {
      /** OK */
      200: {
        schema: definitions['ProfileResponse'];
      };
      /** BAD_REQUEST */
      400: {
        schema: definitions['Response'];
      };
      /** INTERNAL_SERVER */
      500: {
        schema: definitions['Response'];
      };
    };
  };
}
