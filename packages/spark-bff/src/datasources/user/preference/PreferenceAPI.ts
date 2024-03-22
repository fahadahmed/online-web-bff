import {
  constructErrorResponse,
  constructSuccessResponse,
  DESLDataSource,
} from 'datasources/common';
import {
  NexusGenEnums,
  NexusGenInputs,
  NexusGenRootTypes,
} from 'generated/nexusTypes';
import { definitions } from 'generated/typings/userPreferencesProxy';
import { formatQuery } from 'utils/query';
import {
  getRootTopics,
  getSubtopicsByTopic,
} from './helpers/availableTopics.helper';
import {
  constructAddUserPreferenceChannelRequest,
  constructChannelResponse,
  constructUpdateUserPreferenceChannelRequest,
  reducePreference,
} from './helpers/notificationPreference.helper';

const NOTIFICATION_TYPE = 'notification';

type EditChannelPreferenceProp = {
  address?: string;
  authCode?: string;
  channelId?: string;
  channelType?: NexusGenEnums['ChannelType'];
  isOptedIn?: boolean;
  preferenceId?: string;
  status?: string;
};

class PreferenceAPI extends DESLDataSource {
  constructor() {
    super('/v1/user/preferences');
  }

  async getAvailableRootTopics(group?: string) {
    const topics = await this.getAvailableTopics(group);
    return getRootTopics(topics, group);
  }

  async getSubtopics(topicID: string, group?: string) {
    const topics = await this.getAvailableTopics(group);
    return getSubtopicsByTopic(topicID, topics, group);
  }

  private async getAvailableTopics(group?: string) {
    const queryParams = formatQuery({ group });

    const { topics } = await this.get<definitions['AvailableTopicsResponse']>(
      '/topic',
      queryParams,
    );

    return topics;
  }

  async getNotificationPreference(topicId: string) {
    const { preferences } = await this.getPreference(
      NOTIFICATION_TYPE,
      topicId,
    );

    if (!preferences) {
      return [];
    }
    return preferences?.map(reducePreference);
  }

  private async getPreference(typeId: string, topicId: string) {
    const queryParams = {
      type: typeId,
      topic: topicId,
    };
    return this.get<definitions['UsersPreferencesResponse']>(
      '/me',
      queryParams,
    );
  }

  async updatePreferenceChannel(preferenceChannel: EditChannelPreferenceProp) {
    const {
      address,
      authCode,
      channelId,
      channelType,
      isOptedIn,
      preferenceId,
      status,
    } = preferenceChannel;

    if (channelId) {
      // Update the preference
      return this.updateUserPreferenceChannel({
        address,
        channelId,
        channelType,
        isOptedIn,
        preferenceId,
        status,
      });
    }

    // Add the preference
    return this.addUserPreferenceChannel({
      address,
      authCode,
      channelType,
      isOptedIn,
      preferenceId,
    });
  }

  async removeUserPreferenceChannel(
    input: NexusGenInputs['DeleteUserPreferenceChannelInput'],
  ): Promise<NexusGenRootTypes['DeleteUserPreferenceChannelResponse']> {
    const { channelType, channelValue } = input;
    const queryParams = {
      type: channelType,
      value: channelValue,
    };
    return this.delete<definitions['Response']>(`/channel`, queryParams)
      .then((response) => {
        return constructSuccessResponse(response);
      })
      .catch((error) => {
        return constructErrorResponse(error);
      });
  }

  private async updateUserPreferenceChannel(
    channelPreference: EditChannelPreferenceProp,
  ) {
    const { address, channelId, channelType, isOptedIn, preferenceId, status } =
      channelPreference;

    const body = constructUpdateUserPreferenceChannelRequest(isOptedIn, status);

    return this.put<definitions['Response']>(
      `/${preferenceId}/channel/${channelId}`,
      body,
    )
      .then((response) => {
        const successResponse = constructChannelResponse(response, {
          address,
          channelId,
          channelType,
          isActive: isOptedIn,
        });

        return successResponse;
      })
      .catch((error) => {
        return constructErrorResponse(error);
      });
  }

  private async addUserPreferenceChannel(preferenceChannel: {
    address?: string;
    authCode?: string;
    channelType: NexusGenEnums['ChannelType'];
    isOptedIn: boolean;
    preferenceId: string;
  }) {
    const { address, authCode, channelType } = preferenceChannel;

    const body = constructAddUserPreferenceChannelRequest({
      address,
      authCode,
      channel: channelType,
    });

    return this.post<definitions['ChannelResponse']>(
      `/${preferenceChannel.preferenceId}/channel`,
      body,
    )
      .then((response) => {
        const successResponse = constructChannelResponse(response, {
          address,
          channelId: response.channelId,
          channelType,
          isActive: true,
        });

        return successResponse;
      })
      .catch((error) => {
        return constructErrorResponse(error);
      });
  }
}

export default PreferenceAPI;
