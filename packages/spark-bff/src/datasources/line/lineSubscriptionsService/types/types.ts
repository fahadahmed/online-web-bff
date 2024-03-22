import { definitions } from 'generated/typings/lineSubscriptionsService';

type Cta = definitions['Cta'];

export interface CtaWithSwitch extends Omit<Cta, 'type'> {
  type: definitions['Cta']['type'] | 'SWITCH';
}

type SubscriptionsProductResponse = definitions['SubscriptionsProductResponse'];

export interface Subscriptions
  extends Omit<SubscriptionsProductResponse, 'ctas'> {
  ctas: CtaWithSwitch[];
}
