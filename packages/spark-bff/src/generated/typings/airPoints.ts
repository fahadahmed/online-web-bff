/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/v1/services/external/airpoints/{accountNumber}': {
    get: operations['getAirpointsDetails'];
    post: operations['submitAirpointsDetails'];
    delete: operations['deleteAirpointsDetails'];
  };
}

export interface definitions {
  AirpointsRequestData: {
    /** First name of the Airpoints membership */
    firstName: string;
    /** Last name of the Airpoints membership */
    lastName: string;
    /** Airpoints Membership number */
    airpointsNumber: string;
  };
  AirpointsDetails: definitions['Response'] & {
    /** Airpoints membership number */
    airpointsNumber: string;
    /** First name of Airpoints membership */
    firstName: string;
    /** Last name of Airpoints membership */
    lastName: string;
    /** Account number associated with the Airpoints */
    accountNumber: string;
    /** Status of the Airpoints linking */
    status: string;
  };
  Response: {
    /** List of messages */
    messages: definitions['Message'][];
  };
  Message: {
    message: string;
    code: number;
  };
}

export interface parameters {
  /** The account number related to the Airpoints request */
  AccountNumber: string;
}

export interface operations {
  getAirpointsDetails: {
    parameters: {
      path: {
        /** The account number related to the Airpoints request */
        accountNumber: parameters['AccountNumber'];
      };
    };
    responses: {
      /** OK */
      200: {
        schema: definitions['AirpointsDetails'];
      };
      /** Invalid parameters provided */
      400: {
        schema: definitions['Response'];
      };
      /** The provided access token is invalid */
      401: {
        schema: definitions['Response'];
      };
      /** Not authorised to retrieve the Airpoints details for this account */
      403: {
        schema: definitions['Response'];
      };
      /** Internal server error */
      500: {
        schema: definitions['Response'];
      };
    };
  };
  submitAirpointsDetails: {
    parameters: {
      path: {
        /** The account number related to the Airpoints request */
        accountNumber: parameters['AccountNumber'];
      };
      body: {
        /** Airpounts submit request */
        AirpointsRequestData?: definitions['AirpointsRequestData'];
      };
    };
    responses: {
      /** OK */
      200: {
        schema: definitions['AirpointsDetails'];
      };
      /** Invalid request parameters provided */
      400: {
        schema: definitions['Response'];
      };
      /** The provided access token is invalid */
      401: {
        schema: definitions['Response'];
      };
      /** Not authorised to create the Airpoints details for this account */
      403: {
        schema: definitions['Response'];
      };
      /** Internal server error */
      500: {
        schema: definitions['Response'];
      };
    };
  };
  deleteAirpointsDetails: {
    parameters: {
      path: {
        /** The account number related to the Airpoints request */
        accountNumber: parameters['AccountNumber'];
      };
    };
    responses: {
      /** OK */
      200: {
        schema: definitions['Response'];
      };
      /** Invalid request parameters provided */
      400: {
        schema: definitions['Response'];
      };
      /** The provided access token is invalid */
      401: {
        schema: definitions['Response'];
      };
      /** Not authorised to delete the Airpoints details for this account */
      403: {
        schema: definitions['Response'];
      };
      /** Internal server error */
      500: {
        schema: definitions['Response'];
      };
    };
  };
}
