/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/v1/line/{lineNumber}/spend/{interval}': {
    get: operations['getIntervalSpendHistory'];
  };
  '/v1/line/{lineNumber}/spend/{interval}/{periodBreakdownId}': {
    get: operations['getPeriodBreakdownSpendHistory'];
  };
}

export interface definitions {
  IntervalSpendHistoryResponse: definitions['Response'] & {
    interval: definitions['interval'];
    accountType: definitions['accountType'];
    /** The ISO8601 date-time representing the start of the spend history summary response. */
    startDateTime: string;
    /** The ISO8601 date-time representing the end of the spend history summary response. */
    endDateTime: string;
    /** A flag to indicate whether the spend values (charges, discounts, credits, etc) are inclusive of GST. */
    gstInclusive: boolean;
    /** The average period spend, it will have 2 d.p. */
    averagePeriodSpend: number;
    /** An array of the summarised periods covered in this historical spend query sorted chronologically based on the object's startDateTime attribute value.  If no periods are covered then an empty array should be returned. */
    summarisedPeriods: definitions['SummarisedPeriodSpend'][];
  };
  SummarisedPeriodSpend: {
    /** The ISO8601 date-time representing the start of this specific time period. */
    startDateTime: string;
    /** The ISO8601 date-time representing the end of this specific time period. */
    endDateTime: string;
    /** The period spend, it will have 2 d.p. */
    periodSpend: number;
    /** Whether this summarised period has been billed - always false if PREPAID. */
    unbilled: boolean;
    /** An array of objects representing a breakdown of the high-level product types that contributed to the overall spend attributed to this line for the period. If this breakdown-level information is not available downstream then the array will be empty. */
    periodBreakdown: definitions['PeriodBreakdownDetail'][];
  };
  PeriodBreakdownDetail: {
    breakdownType: definitions['breakdownType'];
    /** An identifier that can be supplied to the Line Spend History Detail API endpoint to retrieve product-level spend details for this specific period. If this product-level breakdown is not available downstream then this identifier will be null. */
    periodBreakdownId?: string;
    /** The period spend for this breakdown, it will have 2 d.p. */
    periodSpend: number;
  };
  PeriodBreakdownSpendHistoryResponse: definitions['Response'] & {
    interval: definitions['interval'];
    breakdownType: definitions['breakdownType'];
    /** A flag to indicate whether the spend values (charges, discounts, credits, etc) are inclusive of GST. */
    gstInclusive: boolean;
    /** The ISO8601 date-time representing the start of the spend history summary response. */
    startDateTime: string;
    /** The ISO8601 date-time representing the end of the spend history summary response. */
    endDateTime: string;
    /** The period spend, it will have 2 d.p. */
    periodSpend: number;
    /** Whether this summarised period has been billed - always false if PREPAID. */
    unbilled: boolean;
    /** An array of the products that contributed to this total spend over the nominated period. If no products are identified for the period then an empty array will be returned. */
    contributingProducts: definitions['ContributingProduct'][];
  };
  ContributingProduct: {
    /** The downstream Offer ID associated to this product. */
    offerId?: string;
    /** The customer-facing name for this product. */
    productName: string;
    /** The date when the instance of this product was purchased, renewed or activated. */
    chargeStartDateTime: string;
    /** The date when the charge for the product is ended. */
    chargeEndDateTime?: string;
    /** The date when the product service is terminated. */
    productEndDateTime?: string;
    /** The spend to the line for this product, it will have 2 d.p. */
    periodSpend: number;
  };
  /** Identifies the type of summary returned. Current supported value is MONTHLY */
  interval: 'MONTHLY';
  accountType: 'POSTPAID' | 'PREPAID';
  /** An enum representing the high-level product type associated with the breakdown. */
  breakdownType: 'PLAN' | 'ADDITIONAL_INCLUDED' | 'ADDITIONAL_PAID' | 'CREDIT';
  Response: {
    /** List of Messages */
    messages: definitions['Message'][];
  };
  Message: {
    message: string;
    code: number;
  };
}

export interface parameters {
  /** Identifies the user realm, optional for MySpark/Gen3 App, but mandatory for MySB. */
  realm: 'SPARK_ID' | 'MYSB';
  /** The line number to retrieve historical spend details for. */
  lineNumber: string;
  /** The unit of time to aggregate spend data by. */
  interval: 'monthly';
}

export interface operations {
  getIntervalSpendHistory: {
    parameters: {
      header: {
        /** Identifies the user realm, optional for MySpark/Gen3 App, but mandatory for MySB. */
        realm?: parameters['realm'];
      };
      path: {
        /** The line number to retrieve historical spend details for. */
        lineNumber: parameters['lineNumber'];
        /** The unit of time to aggregate spend data by. */
        interval: parameters['interval'];
      };
      query: {
        /** The start date of the historical query in ISO8601 date format. */
        start?: string;
        /** The end date of the historical query in ISO8601 date format */
        end?: string;
      };
    };
    responses: {
      /** OK */
      200: {
        schema: definitions['IntervalSpendHistoryResponse'];
      };
      /** Invalid input parameters */
      400: {
        schema: definitions['Response'];
      };
      /** Unauthenticated */
      401: {
        schema: definitions['Response'];
      };
      /** Not authorised to fetch spend history details about this line */
      403: {
        schema: definitions['Response'];
      };
      /** Line not found */
      404: {
        schema: definitions['Response'];
      };
      /** Failed to fetch spend history details due to internal server error */
      500: {
        schema: definitions['Response'];
      };
      /** Line not supported */
      501: {
        schema: definitions['Response'];
      };
    };
  };
  getPeriodBreakdownSpendHistory: {
    parameters: {
      header: {
        /** Identifies the user realm, optional for MySpark/Gen3 App, but mandatory for MySB. */
        realm?: parameters['realm'];
      };
      path: {
        /** The line number to retrieve historical spend details for. */
        lineNumber: parameters['lineNumber'];
        /** The unit of time to aggregate spend data by. */
        interval: parameters['interval'];
        /** The identifier for the period that product-level spend details should be returned for. */
        periodBreakdownId: string;
      };
    };
    responses: {
      /** OK */
      200: {
        schema: definitions['PeriodBreakdownSpendHistoryResponse'];
      };
      /** Invalid input parameters */
      400: {
        schema: definitions['Response'];
      };
      /** Unauthenticated */
      401: {
        schema: definitions['Response'];
      };
      /** Not authorised to fetch spend history details about this line */
      403: {
        schema: definitions['Response'];
      };
      /** Line not found */
      404: {
        schema: definitions['Response'];
      };
      /** Failed to fetch spend history details due to internal server error */
      500: {
        schema: definitions['Response'];
      };
      /** Line not supported */
      501: {
        schema: definitions['Response'];
      };
    };
  };
}
