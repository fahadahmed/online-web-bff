import { constructSuccessResponse } from 'datasources/common';
import { NexusGenInputs, NexusGenRootTypes } from 'generated/nexusTypes';
import { definitions } from 'generated/typings/a2PMessagingService';

export function constructAddServiceRequestSuccessResponse(
  deslResponse: definitions['ServiceRequestIdDatabaseResource'],
): NexusGenRootTypes['A2PAddServiceRequestResponse'] {
  return {
    ...constructSuccessResponse(deslResponse),
    serviceRequestId: deslResponse.serviceRequestId,
  };
}

export function constructAddServiceRequest(
  input: NexusGenInputs['A2PAddServiceRequestRequest'],
) {
  const {
    contentProviderId,
    preferredNumber,
    messageType,
    messageUsage,
    serviceEndDateTime,
    carriers,
    serviceName,
    serviceDescription,
    mobileTerminatingMessageExample,
    mobileOriginatingMessageExample,
    serviceMarketingChannels,
    expectedMessageVolume,
    expectedMessageVolumeDescription,
    predictedPeakTimeDescription,
    firstName,
    lastName,
    jobTitle,
    serviceComplianceDescription,
    signature,
    technicalContact,
    companyName,
    address,
  } = input;

  const request: definitions['ServiceRequestPostForm'] = {
    requestType: 'NEW',
    contentProviderId,
    messageType,
    messageUsage,
    serviceEndDateTime,
    carriers,
    phoneNumber: preferredNumber,
    serviceName,
    serviceDescription,
    mobileTerminatingMessageExample,
    mobileOriginatingMessageExample,
    serviceMarketingChannels,
    expectedMessageVolume,
    predictedPeakTimeDescription,
    firstName,
    lastName,
    jobTitle,
    serviceComplianceDescription,
    signature,
    technicalContact,
    address,
    companyName,
    expectedMessageVolumeDescription,
  };
  return request;
}
