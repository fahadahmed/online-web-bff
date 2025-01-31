/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/v1/user/preferences/me': {
    get: operations['getUsersPreferences'];
  };
  '/v1/user/preferences/topic': {
    get: operations['retrieveTopics'];
  };
  '/v1/user/preferences/topic/{topicId}': {
    get: operations['getParentTopicDetails'];
  };
  '/v1/user/preferences': {
    post: operations['createUserPreferences'];
  };
  '/v1/user/preferences/{preferenceId}/channel': {
    post: operations['createChannel'];
  };
  '/v1/user/preferences/{preferenceId}': {
    put: operations['updateUserPreference'];
  };
  '/v1/user/preferences/{preferenceId}/channel/{channelId}': {
    put: operations['updateUserPreferenceChannel'];
  };
  '/v1/user/preferences/channel': {
    delete: operations['deletePreferenceChannel'];
  };
}

export interface definitions {
  UsersPreferencesResponse: definitions['Response'] & {
    /** All the preferences set by the user for the requested topic are returned. */
    preferences?: definitions['Preference'][];
  };
  Preference: {
    /** The uuid of the preference. */
    id: string;
    /** Value of the preference set by user. */
    value: string;
    /** The status of the preference. */
    status?: string;
    /** Preference is only applied to a specific entity, rather than generically. */
    entity?: string;
    /** This is the entity identifier that the exception applies to. */
    entityId?: string;
    /** If the preferences is a type that relates to a topic, then topic id is returned. */
    topicId?: string;
    /** If the preferences is a type that relates to a topic, then topic name is returned. */
    topicName?: string;
    /** An array of possible mediums that relate to the preference. */
    channels?: definitions['Channel'][];
  };
  Channel: {
    /** The uuid of the medium.  If a preference medium needs to be updated, the uuid of the medium is required. */
    id: string;
    /** The type of the medium, which provides context for the medium value. */
    type: string;
    /** The medium value when applicable.  Not all medium types need a value. */
    value?: string;
    /** The status of the medium.  Not all mediums will necessarily be eligible. */
    status?: string;
  };
  AvailableTopicsResponse: definitions['Response'] & {
    /** All the topics and sub-topics are returned. */
    topics?: definitions['Topic'][];
  };
  ParentTopic: definitions['Response'] & {
    topic?: definitions['Topic'];
  };
  Topic: {
    /** Name of the topic (or sub-topic). */
    name: string;
    /** The uuid of the topic. */
    id: string;
    /** Description of the topic. */
    description: string;
    /** Provides the id of the root topic for current topic. */
    root: string;
    /** If this is a sub-topic, provides the parent of this sub-topic. */
    parent: string;
    /** Identifies whether the topic/sub-topic supports topic level opt-in and opt-out. */
    canOptInOut?: boolean;
    /** Identifies what type of assets topic/sub-topic relates. */
    assetType?:
      | 'MOBILE_LINE'
      | 'BROADBAND_LINE'
      | 'POSTPAID_ACCOUNT'
      | 'PREPAID_LINE';
  };
  CreatePreference: {
    /** The topic which the preference relates to. This can be a topic or sub-topic, and only the reference to the topic is needed. */
    topicId: string;
    /** Name of topic which preference relates to. This can be a topic or sub-topic, and only the reference to the topic is needed. */
    topicName?: string;
    value: definitions['ValueType'];
    /** This identifies the type of entity the preference is related to. */
    entity?: 'customer' | 'account' | 'asset' | 'user';
    /** If the entity is specified, the identifier for the entity is required. So this will be a reference to the customer, account or asset depending on the entity type. */
    entityId?: string;
    /** The status to set the preference. */
    status: 'Unverified' | 'Active' | 'Inactive';
  };
  PreferenceCreationResponse: definitions['Response'] & {
    /** If preference was created successfully, the identifier of the created preference will be returned. */
    preferenceId?: string;
  };
  CreateCommunicationChannels: {
    channel: definitions['ChannelType'];
    address?: definitions['AddressType'];
    /** The status to channel. */
    status?: 'Unverified' | 'Active' | 'Inactive';
    /** Creating active channels requires user authorisation of the address. */
    authCode?: string;
  };
  ChannelResponse: definitions['Response'] & {
    /** If channel was created successfully, the identifier of the created preference will be returned. */
    channelId?: string;
  };
  /** Value of the preference setting. */
  ValueType: 'OPT_IN' | 'OPT_OUT';
  /** The channel for the notification communication. */
  ChannelType: 'email' | 'sms' | 'inapp' | 'push';
  /** The address of the channel. */
  AddressType: string;
  UpdatePreference: {
    value: definitions['ValueType'];
  };
  UpdateCommunicationChannels: {
    channel: definitions['ChannelType'];
    address?: definitions['AddressType'];
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

export interface parameters {
  /** The identifier of the preferences. */
  preferenceId: string;
}

export interface operations {
  getUsersPreferences: {
    parameters: {
      query: {
        /** This specifics the type of preferences to be returned. */
        type: 'notification';
        /** This specifies topic of the returned preferences. */
        topic?: string;
      };
    };
    responses: {
      /** Success response */
      200: {
        schema: definitions['UsersPreferencesResponse'];
      };
      /** bad request */
      400: {
        schema: definitions['Response'];
      };
      /** The provided token is invalid, or access is otherwise denied. */
      401: {
        schema: definitions['Response'];
      };
      /** Internal Server Error, something went wrong internally */
      500: {
        schema: definitions['Response'];
      };
    };
  };
  retrieveTopics: {
    parameters: {
      query: {
        /** This specifics the group of topics which should be retrieved. */
        group?: 'notification';
      };
    };
    responses: {
      /** Success response */
      200: {
        schema: definitions['AvailableTopicsResponse'];
      };
      /** bad request */
      400: {
        schema: definitions['Response'];
      };
      /** Internal Server Error, something went wrong internally */
      500: {
        schema: definitions['Response'];
      };
    };
  };
  getParentTopicDetails: {
    parameters: {
      path: {
        /** This specifics the group of topics which should be retrieved. */
        topicId: string;
      };
    };
    responses: {
      /** Success response */
      200: {
        schema: definitions['ParentTopic'];
      };
      /** bad request */
      400: {
        schema: definitions['Response'];
      };
      /** Internal Server Error, something went wrong internally */
      500: {
        schema: definitions['Response'];
      };
    };
  };
  createUserPreferences: {
    parameters: {
      body: {
        PreferenceData?: definitions['CreatePreference'];
      };
    };
    responses: {
      /** OK */
      200: {
        schema: definitions['PreferenceCreationResponse'];
      };
      /** Preference centre returned an error and failed to persist the preference. */
      400: {
        schema: definitions['Response'];
      };
      /** The provided token is invalid, or access is otherwise denied. */
      401: {
        schema: definitions['Response'];
      };
      /** Downstream failures/general breakage. */
      500: {
        schema: definitions['Response'];
      };
    };
  };
  createChannel: {
    parameters: {
      path: {
        /** The identifier of the preferences. */
        preferenceId: parameters['preferenceId'];
      };
      body: {
        ChannelData?: definitions['CreateCommunicationChannels'];
      };
    };
    responses: {
      /** OK */
      200: {
        schema: definitions['ChannelResponse'];
      };
      /** Channel not created. Invalid authorisation code or Preference centre returned an error and failed to persist the preference. */
      400: {
        schema: definitions['Response'];
      };
      /** The provided token is invalid, or access is otherwise denied. */
      401: {
        schema: definitions['Response'];
      };
      /** Downstream failures/general breakage. */
      500: {
        schema: definitions['Response'];
      };
    };
  };
  updateUserPreference: {
    parameters: {
      path: {
        /** The identifier of the preferences. */
        preferenceId: parameters['preferenceId'];
      };
      body: {
        UpdatePreference?: definitions['UpdatePreference'];
      };
    };
    responses: {
      /** OK */
      200: {
        schema: definitions['Response'];
      };
      /** Preference centre returned an error and failed to persist the preference. */
      400: {
        schema: definitions['Response'];
      };
      /** The provided token is invalid, or access is otherwise denied. */
      401: {
        schema: definitions['Response'];
      };
      /** Downstream failures/general breakage. */
      500: {
        schema: definitions['Response'];
      };
    };
  };
  updateUserPreferenceChannel: {
    parameters: {
      path: {
        /** The identifier of the preferences. */
        preferenceId: parameters['preferenceId'];
        /** The identifier of the channel to be updated. */
        channelId: string;
      };
      body: {
        UpdateChannel?: definitions['UpdateCommunicationChannels'];
      };
    };
    responses: {
      /** OK */
      200: {
        schema: definitions['Response'];
      };
      /** Preference centre returned an error and failed to persist the preference. */
      400: {
        schema: definitions['Response'];
      };
      /** The provided token is invalid, or access is otherwise denied. */
      401: {
        schema: definitions['Response'];
      };
      /** Downstream failures/general breakage. */
      500: {
        schema: definitions['Response'];
      };
    };
  };
  deletePreferenceChannel: {
    parameters: {
      query: {
        /** Type of channel to be removed. */
        type: string;
        /** Value uniquely identify the channel to be removed. */
        value: string;
      };
    };
    responses: {
      /** Channel was successfully removed from users preferences. */
      200: {
        schema: definitions['Response'];
      };
      /** bad request */
      400: {
        schema: definitions['Response'];
      };
      /** Internal Server Error, something went wrong internally */
      500: {
        schema: definitions['Response'];
      };
    };
  };
}
