import { constructGenericResponse } from 'datasources/common';
import { NexusGenRootTypes } from 'generated/nexusTypes';
import { definitions } from 'generated/typings/a2PMessagingService';

export function constructAddContentProviderResponse(
  deslResponse: definitions['ContentProviderIdDatabaseResource'],
): NexusGenRootTypes['A2PAddContentProviderResponse'] {
  return {
    contentProviderId: deslResponse.contentProviderId,
    ...constructGenericResponse(deslResponse),
  };
}

export function constructModifyContentProviderResponse(
  deslResponse: definitions['ContentProviderIdDatabaseResource'],
): NexusGenRootTypes['A2PStatusResponse'] {
  return {
    status: true,
    ...constructGenericResponse(deslResponse),
  };
}
