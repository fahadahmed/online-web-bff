import qs from 'qs';
import { constructSuccessResponse } from 'datasources/common';
import { definitions } from 'generated/typings/userPreferencesProxy';
import { NexusGenRootTypes, NexusGenEnums } from 'generated/nexusTypes';
import { makeNodeID } from 'utils/graphNode';
import { formatQuery } from 'utils/query';

type PreferenceChannels = NexusGenRootTypes['PreferenceChannel'][];

function hasChannelType(
  existingChannels: PreferenceChannels,
  type: NexusGenEnums['ChannelType'],
) {
  return existingChannels.find((channel) => {
    return channel.type === type;
  });
}

function makeChannel(type: NexusGenEnums['ChannelType'], preferenceId: string) {
  const tempId = `${preferenceId}-${type}`;
  return {
    id: makeNodeID('PreferenceChannel', tempId),
    entityID: '',
    isActive: false,
    value: '',
    type,
  };
}

function addMissingChannels(
  channels: PreferenceChannels,
  preferenceId: string,
): PreferenceChannels {
  const withMissingChannels: PreferenceChannels = [...channels];
  const eligibleChannels: NexusGenEnums['ChannelType'][] = ['inapp', 'push'];

  eligibleChannels.forEach((channelType) => {
    if (!hasChannelType(channels, channelType)) {
      const missingChannel = makeChannel(channelType, preferenceId);
      withMissingChannels.push(missingChannel);
    }
  });

  return withMissingChannels;
}

const composeChannels = (
  preference: definitions['Preference'],
): PreferenceChannels => {
  const { channels = [], entityId } = preference;
  const existingChannels = channels?.map(({ id, type, status, value }) => {
    return {
      id: makeNodeID('PreferenceChannel', id),
      isActive: status?.toUpperCase() === 'ACTIVE',
      value,
      entityID: id,
      type: type?.toLowerCase() as NexusGenEnums['ChannelType'],
      status,
    };
  });

  const composedChannels = addMissingChannels(existingChannels, entityId);

  return composedChannels;
};

export const reducePreference = (
  preference: definitions['Preference'],
): NexusGenRootTypes['NotificationPreference'] => {
  const { id, entityId } = preference;
  const channels = composeChannels(preference);

  return {
    id: makeNodeID('NotificationPreference', entityId),
    entityID: id,
    line: entityId,
    channels,
  };
};

export const constructUpdateUserPreferenceChannelRequest = (
  isOptedIn: boolean,
  status?: string,
) => {
  const value: definitions['ValueType'] = isOptedIn ? 'OPT_IN' : 'OPT_OUT';

  return {
    value,
    status,
  };
};

export const constructAddUserPreferenceChannelRequest = (addPreferenceRequest: {
  address: string;
  authCode?: string;
  channel: NexusGenEnums['ChannelType'];
}) => {
  const body = qs.parse(
    formatQuery({ ...addPreferenceRequest, status: 'ACTIVE' }),
  );

  return body;
};

export const constructChannelResponse = (
  response: definitions['ChannelResponse'],
  preferenceChannel: {
    channelId: string;
    address: string;
    channelType: NexusGenEnums['ChannelType'];
    isActive: boolean;
  },
) => {
  const { channelId, channelType, address, isActive } = preferenceChannel;
  const baseResponse = constructSuccessResponse(response);

  const successResponse: NexusGenRootTypes['UpdatePreferenceChannelResponse'] =
    {
      ...baseResponse,
    };

  if (channelId) {
    successResponse.channelPreference = {
      id: makeNodeID('PreferenceChannel', channelId),
      entityID: channelId,
      type: channelType,
      isActive,
      value: address,
    };
  }

  return successResponse;
};
