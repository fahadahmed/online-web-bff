import { definitions } from 'generated/typings/productDetailServiceV2';

export const transformNotifications = ({
  recommendationId,
  text,
  title,
  type,
}: definitions['Notification']) => ({
  recommendationId,
  text,
  title,
  type,
});
