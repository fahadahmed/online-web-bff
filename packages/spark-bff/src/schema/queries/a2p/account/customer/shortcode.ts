import { extendType, interfaceType, objectType, stringArg } from 'nexus';
import { ContextType } from 'types';
import { A2PShortcodeCTA } from '../shared/shortcodeCTA';
import { A2PShortcodeStatus } from '../shared/stortcodeStatus';
import { A2PCustomerUsage } from './usage';

export const A2PCustomerShortcodeBase = interfaceType({
  name: 'A2PCustomerShortcodeBase',
  description: 'Shortcode base fields',
  resolveType: () => {
    return null;
  },
  definition(t) {
    t.string('customerNumber', {
      description: 'Customer number',
    });
    t.string('customerName', {
      description: 'Customer name',
    });
    t.int('shortCodeNumber', {
      description: 'Shortcode number',
    });
    t.field('status', {
      type: A2PShortcodeStatus,
    });
    t.list.field('ctas', {
      type: A2PShortcodeCTA,
    });
    t.field('usage', {
      type: A2PCustomerUsage,
    });
  },
});

export const A2PCustomerShortcode = objectType({
  name: 'A2PCustomerShortcode',
  description: 'Shortcode fields',
  definition(t) {
    t.implements(A2PCustomerShortcodeBase);
    t.int('contentProviderId', { description: 'Content provider id' });
    t.nullable.string('preferredNumber', { description: 'Preferred number' });
    t.field('messageType', {
      type: 'A2PServiceRequestMessageType',
      description: 'MessageType',
    });
    t.field('messageUsage', {
      type: 'A2PServiceRequestMessageUsage',
      description: 'Message usage',
    });
    t.string('serviceEndDateTime', {
      description: 'Service end date and time',
    });
    t.list.field('carriers', {
      type: 'A2PServiceRequestCarrier',
      description: 'Service request carriers',
    });
    t.string('serviceName', { description: 'Service name' });
    t.string('serviceDescription', { description: 'Service description' });
    t.string('mobileTerminatingMessageExample', {
      description: 'Mobile terminating message example',
    });
    t.string('mobileOriginatingMessageExample', {
      description: 'Mobile originating message example',
    });
    t.list.string('serviceMarketingChannels', {
      description: 'Service request marketing channels',
    });
    t.field('expectedMessageVolume', {
      type: 'A2PServiceRequestMessageVolume',
      description: 'Service request message volume',
    });
    t.string('predictedPeakTimeDescription', {
      description: 'Predicted peak time description',
    });
    t.string('firstName', {
      description: 'First name',
    });
    t.string('lastName', {
      description: 'Last name',
    });
    t.string('jobTitle', {
      description: 'Job title',
    });
    t.string('serviceComplianceDescription', {
      description: 'Service compliance description',
    });
    t.string('signature', {
      description: 'Signature',
    });
  },
});

export const A2PCustomerShortcodeQuery = extendType({
  type: 'A2POrganisationDetails',
  definition(t) {
    t.field('shortcode', {
      type: A2PCustomerShortcode,
      args: {
        shortcode: stringArg(),
      },
      async resolve(
        { customerNumber },
        { shortcode },
        { dataSources: { a2pCustomerAPI } }: ContextType,
      ) {
        return a2pCustomerAPI.getShortcode(customerNumber, shortcode);
      },
    });
  },
});
