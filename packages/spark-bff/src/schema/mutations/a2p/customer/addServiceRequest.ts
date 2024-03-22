import { enumType, inputObjectType, mutationField, objectType } from 'nexus';
import { ContextType } from 'types';

export const A2PServiceRequestMessageType = enumType({
  name: 'A2PServiceRequestMessageType',
  members: ['STANDARD', 'ZERO_RATED'],
  description: 'Service request message type',
});

export const A2PServiceRequestMessageUsage = enumType({
  name: 'A2PServiceRequestMessageUsage',
  members: ['MARKETING', 'TRANSACTIONAL'],
  description: 'Service request message usage',
});

export const A2PServiceRequestCarrier = enumType({
  name: 'A2PServiceRequestCarrier',
  members: ['SPARK', 'TWODEGREES', 'VODAFONE'],
  description: 'Service request carrier',
});

export const A2PServiceRequestMessageVolume = enumType({
  name: 'A2PServiceRequestMessageVolume',
  members: ['LOW', 'MEDIUM', 'HIGH'],
  description: 'Service request message volume',
});

export const A2PServiceRequestAddress = inputObjectType({
  name: 'A2PServiceRequestAddress',
  definition(t) {
    t.string('label');
    t.string('elid');
  },
});

export const A2PServiceRequestTechnicalContact = inputObjectType({
  name: 'A2PServiceRequestTechnicalContact',
  definition(t) {
    t.string('email');
    t.string('firstName');
    t.string('lastName');
    t.string('phoneNumber');
  },
});

export const A2PAddServiceRequestRequest = inputObjectType({
  name: 'A2PAddServiceRequestRequest',
  description: 'Request to submit request for shortcode to be created',
  definition(t) {
    t.string('companyName');
    t.string('customerNumber', { description: 'Customer number' });
    t.int('contentProviderId', { description: 'Content provider id' });
    t.nullable.string('preferredNumber', { description: 'Preferred number' });
    t.field('messageType', {
      type: A2PServiceRequestMessageType,
      description: 'MessageType',
    });
    t.field('messageUsage', {
      type: A2PServiceRequestMessageUsage,
      description: 'Message usage',
    });
    t.string('serviceEndDateTime', {
      description: 'Service end date and time',
    });
    t.list.field('carriers', {
      type: A2PServiceRequestCarrier,
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
      type: A2PServiceRequestMessageVolume,
      description: 'Service request message volume',
    });
    t.string('expectedMessageVolumeDescription');
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
    t.field('address', {
      type: A2PServiceRequestAddress,
    });
    t.field('technicalContact', {
      type: A2PServiceRequestTechnicalContact,
    });
  },
});

export const A2PAddServiceRequestResponse = objectType({
  name: 'A2PAddServiceRequestResponse',
  description: 'Response to submit request for shortcode to be created',
  definition(t) {
    t.nullable.string('serviceRequestId', {
      description: 'Service request id',
    });
    t.implements('GenericMutationResponse');
  },
});

export const a2pAddServiceRequest = mutationField('a2pAddServiceRequest', {
  type: A2PAddServiceRequestResponse,
  description: 'Submit request for shortcode to be created',
  args: {
    input: A2PAddServiceRequestRequest,
  },
  resolve(_, { input }, { dataSources: { a2pCustomerAPI } }: ContextType) {
    return a2pCustomerAPI.addServiceRequest(input);
  },
});
