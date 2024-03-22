import { NexusGenRootTypes } from 'generated/nexusTypes';
import { definitions } from 'generated/typings/a2PMessagingService';

type ContentProviders =
  definitions['ContentProvidersDatabaseResource']['contentProviders'];

type ContentProvider = ContentProviders[0];

const sortContentProvidersById = (a: ContentProvider, b: ContentProvider) => {
  return b.contentProviderId - a.contentProviderId;
};

export const mapContentProviders = (
  response: definitions['ContentProvidersDatabaseResource'],
): NexusGenRootTypes['A2PCustomerContentProvider'][] => {
  return (response?.contentProviders || []).sort(sortContentProvidersById);
};
