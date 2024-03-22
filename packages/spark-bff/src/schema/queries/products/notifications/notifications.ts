import { enumType, objectType } from 'nexus';
import { definitions } from 'generated/typings/productDetailServiceV2';

const NotificationTypes: definitions['Notification']['type'][] = [
  'SUCCESS',
  'INFO',
  'WARN',
  'ERROR',
];

const NotificationType = enumType({
  name: 'NotificationType',
  members: NotificationTypes,
  description: 'Notification type',
});

export const Notifications = objectType({
  name: 'Notifications',
  definition(t) {
    t.string('recommendationId');
    t.string('text');
    t.nullable.string('title');
    t.field('type', {
      type: NotificationType,
    });
  },
});
