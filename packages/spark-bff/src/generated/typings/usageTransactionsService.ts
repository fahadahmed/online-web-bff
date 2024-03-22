/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/v1/line/usage/me/{lineNumber}/transactions': {
    get: operations['getUsageTransactions'];
  };
  '/v1/line/usage/me/{lineNumber}/transactions/pages/{key}': {
    get: operations['getPagedUsageTransactions'];
  };
}

export interface definitions {
  UsageTransactions: definitions['Response'] & {
    /** Identifies the type of account associated with this usage transaction response. */
    accountType: 'POSTPAID' | 'PREPAID';
    /** The start date-time used in the query placed to the downstream SingleView datasource */
    startDateTime: string;
    /** The end date-time used in the query placed to the downstream SingleView datasource */
    endDateTime: string;
    /** The number of transaction results requested as part of downstream query.  Important note: this is *not* the same as the number of results returned */
    pageSize: number;
    /** Present if additional pages of results are available. */
    nextPageKey?: string;
    /** The transactions associated with this line sorted in reverse chronological order (i.e. newest first). */
    transactions: definitions['Transaction'][];
  };
  /** This is not complete yet, as the design hasn't been completed */
  Transaction: {
    /** The type of transaction */
    transactionType: 'CHARGE' | 'PAYMENT' | 'ADJUSTMENT';
    /** The start of this transaction */
    startDateTime: string;
    /** The end of this transaction.  In the case of a payment or adjustment the endDateTime will be equal to the startDateTime as those are instantaneous events */
    endDateTime: string;
    /** The line balance prior to this transaction in NZD */
    previousBalance: number;
    /** The line balance following this transaction in NZD */
    currentBalance: number;
    /** Indicates if the transaction is a debit, e.g. charge, or credit (payment). Note adjustments could potentially be either a debit or credit depending on the type applied. */
    isDebit: boolean;
    /** A customer-friendly term for the type of transaction */
    type: string;
    /** Description of the transaction, e.g. the type of activity or product purchase. */
    description: string;
    /** The value of the transaction in NZD */
    value: number;
    /** Indicates if this value includes a GST component. */
    isGstInclusive: boolean;
    /** The payment details associated with this transaction if it is of type PAYMENT. */
    paymentDetails?: definitions['Payment'];
    /** The charge details associated with this transaction if it is of type CHARGE. */
    chargeDetails?: definitions['Charge'];
    /** The adjustment details associated with this transaction if it is of type ADJUSTMENTD. */
    adjustmentDetails?: definitions['Adjustment'];
  };
  Payment: {
    /** The downstream identifier for the payment */
    paymentId: string;
    /** The payment channel that received/processed the payment request. */
    paymentChannel: string;
    /** The status of the payment.  Deliberately not an enum */
    paymentStatus: { [key: string]: any };
    /** The method of payment.  Again, deliberately not an enum */
    paymentMethod: string;
    /** The payment reference */
    paymentReference?: string;
  };
  Charge: {
    /** The type of charge.  Also, not an enum */
    chargeType: string;
    /** The source of the charge if applicable.  Not an enum */
    chargeSource?: string;
    /** The event ID associated to the usage charge */
    eventId?: string;
    /** The type of event.  Still not an enum */
    eventType: string;
    /** The sub-category of event type if applicable.  Not even an enum */
    eventSubType?: string;
    /** The line number that was contacted during the charge event, e.g. the phone number the customer called from this line. */
    toNumber?: string;
    /** The total data/call/txt(?) usage related to this transaction. */
    usage?: definitions['Usage'];
  };
  Adjustment: {
    /** The identifier of the adjustment */
    adjustmentId?: string;
    /** The type of adjustment applied. */
    adjustmentType: string;
    /** The status of the adjustment */
    adjustmentStatus: string;
    /** The reason code for the adjustment. */
    reasonCode?: string;
    /** The reason description for the adjustment. */
    reasonDescription?: string;
  };
  Usage: {
    /** The total usage during the time period covered */
    value: number;
    /** the units the value represents */
    unit: 'GB' | 'MB' | 'MIN' | 'TEXT';
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
  getUsageTransactions: {
    parameters: {
      path: {
        /** The line number to fetch the transactions for */
        lineNumber: string;
      };
      query: {
        /** The start timestamp of the transactional data to fetch; the default value for this is 12am, four months ago */
        start?: string;
        /** The end timestamp of the transactional data to fetch; the default value for this is tomorrow, 12am */
        end?: string;
        /** The maximum number of transactions to return in a single response (note: out-of range values will be clamped to the range of valid values: 1-100). */
        size?: number;
      };
    };
    responses: {
      /** OK */
      200: {
        schema: definitions['UsageTransactions'];
      };
      /** Bad request data */
      400: {
        schema: definitions['Response'];
      };
      /** Unauthenticated */
      401: {
        schema: definitions['Response'];
      };
      /** Not authorised to fetch usage transactions about this line */
      403: {
        schema: definitions['Response'];
      };
      /** INTERNAL_SERVER_ERROR */
      500: {
        schema: definitions['Response'];
      };
    };
  };
  getPagedUsageTransactions: {
    parameters: {
      path: {
        /** The line number to fetch the transactions for */
        lineNumber: string;
        /** The key to request for the next set of results relating to the supplied line number, date-time range and page size; this should be obtained from the previous response */
        key: string;
      };
      query: {
        /** The start timestamp of the transactional data to fetch */
        start: string;
        /** The end timestamp of the transactional data to fetch */
        end: string;
        /** The maximum number of transactions to return in a single response */
        size: number;
      };
    };
    responses: {
      /** OK */
      200: {
        schema: definitions['UsageTransactions'];
      };
      /** Bad request data */
      400: {
        schema: definitions['Response'];
      };
      /** Unauthenticated */
      401: {
        schema: definitions['Response'];
      };
      /** Not authorised to fetch usage transactions about this line */
      403: {
        schema: definitions['Response'];
      };
      /** INTERNAL_SERVER_ERROR */
      500: {
        schema: definitions['Response'];
      };
    };
  };
}
