import { rest } from 'msw';
import { definitions } from 'generated/typings/userPreferencesProxy';

import addChannelPreference from './add-user-pref-channel.mock.json';
import addChannelPreferenceAuthCode from './add-channel-auth-code-gen.mock.json';
import addChannelPreferenceInvalidOTP from './add-channel-auth-code-invalid.mock.json';
import allTopics from './topics-all.mock.json';
import deletePreferenceChannelSuccess from './delete-preference-channel-success.mock.json';
import deletePreferenceChannelFailure from './delete-preference-channel-failure.mock.json';
import notificationTopics from './topics-notification.mock.json';
import prefBroadbandUsage from './pref-broadband-usage.mock.json';
import prefMobileUsage from './pref-mobile-usage.mock.json';
import prefOthersUsage from './pref-others.mock.json';
import updatePreferenceFailure from './update-preference-failure.mock.json';
import updatePreferenceSuccess from './update-preference-success.mock.json';

export const preferenceTopicsMock = rest.get(
  'http://testhost/v1/user/preferences/topic',
  async (req, res, ctx) => {
    const group = req.url.searchParams.get('group');

    if (group === 'notification') {
      return res(ctx.json(notificationTopics));
    }

    if (!group) {
      return res(ctx.json(allTopics));
    }

    return res(ctx.status(404), ctx.json({}));
  },
);

export const userNotificationPreferenceMock = rest.get(
  'http://testhost/v1/user/preferences/me',
  async (req, res, ctx) => {
    const topic = req.url.searchParams.get('topic');
    if (topic === 'broadband-asdgas87-iv') {
      return res(ctx.json(prefBroadbandUsage));
    }
    if (topic === 'mobile-ewHmbp095-v') {
      return res(ctx.json(prefMobileUsage));
    }

    if (topic === '1234-56789-0') {
      return res(ctx.status(500), ctx.json({}));
    }

    return res(ctx.json(prefOthersUsage));
  },
);

export const updateUserPreferenceMock = rest.put(
  'http://testhost/v1/user/preferences/:preferenceId/channel/:channelId',
  async (req, res, ctx) => {
    const { channelId } = req.params;
    if (channelId === 'successExampleId' || channelId === '4-jn4ha') {
      return res(ctx.status(200), ctx.json(updatePreferenceSuccess));
    }

    return res(ctx.status(400), ctx.json(updatePreferenceFailure));
  },
);

export const addUserPreferenceChannelMock = rest.post(
  'http://testhost/v1/user/preferences/:preferenceId/channel',
  async (req, res, ctx) => {
    const mock = {
      ...addChannelPreference,
      channelId: addChannelPreference.channelId,
    };

    const body = req.body as definitions['CreateCommunicationChannels'];

    if (body?.channel === 'sms' || body?.channel === 'email') {
      if (!body?.authCode) {
        return res(ctx.status(200), ctx.json(addChannelPreferenceAuthCode));
      }

      if (body?.authCode === '111111') {
        return res(ctx.status(200), ctx.json(addChannelPreferenceInvalidOTP));
      }
    }

    return res(ctx.status(200), ctx.json(mock));
  },
);

export const deleteUserPreferenceChannelMock = rest.delete(
  'http://testhost/v1/user/preferences/channel',
  async (req, res, ctx) => {
    const channelType = req.url.searchParams.get('type');
    const channelValue = req.url.searchParams.get('value');
    const channelTypeToLowerCase = channelType.toLowerCase();
    const validChannelType =
      channelTypeToLowerCase === 'sms' || channelTypeToLowerCase === 'email';
    /* If channelValue does not exist for example, 021333444, AND If channelType is 
       not one of 'email' or 'sms', then it returns a failure response.
    */
    if (!validChannelType || !channelValue) {
      return res(ctx.status(400), ctx.json(deletePreferenceChannelFailure));
    }
    return res(ctx.status(200), ctx.json(deletePreferenceChannelSuccess));
  },
);

const handlers = [
  addUserPreferenceChannelMock,
  preferenceTopicsMock,
  userNotificationPreferenceMock,
  updateUserPreferenceMock,
  deleteUserPreferenceChannelMock,
];

export default handlers;
