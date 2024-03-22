import { enumType, extendType, objectType } from 'nexus';
import { ContextType } from 'types';

export const A2PCustomerServiceProviderMessageType = enumType({
  name: 'A2PCustomerServiceProviderMessageType',
  members: ['STANDARD', 'ZERO_RATED'],
  description: 'Service provider message type',
});

export const A2PCustomerServiceProviderStatus = enumType({
  name: 'A2PCustomerServiceProviderStatus',
  members: ['OPEN', 'APPROVED', 'REJECTED'],
  description: 'Service provider status',
});

export const A2PCustomerServiceRequest = objectType({
  name: 'A2PCustomerServiceRequest',
  description: 'Service request',
  definition(t) {
    t.string('serviceRequestId', {
      description: 'Service request id',
    });
    t.int('contentProviderId', {
      description: 'Content provider id',
    });
    t.nullable.string('assignedShortcodeNumber', {
      description: 'Assigned shortcode number',
    });
    t.nullable.string('requestedShortcodeNumber', {
      description: 'Requested shortcode number',
    });
    t.field('messageType', {
      description: 'Message type',
      type: A2PCustomerServiceProviderMessageType,
    });
    t.field('status', {
      description: 'Status',
      type: A2PCustomerServiceProviderStatus,
    });
    t.string('dateTimeCreated', {
      description: 'Date and time created',
    });
    t.string('dateTimeModified', {
      description: 'Date and time modified',
    });
  },
});

export const A2PCustomerServiceRequestQuery = extendType({
  type: 'A2POrganisationDetails',
  definition(t) {
    t.list.field('serviceRequests', {
      type: A2PCustomerServiceRequest,
      resolve(
        { customerNumber },
        __,
        { dataSources: { a2pCustomerAPI } }: ContextType,
      ) {
        return a2pCustomerAPI.getServiceRequests(customerNumber);
      },
    });
  },
});
