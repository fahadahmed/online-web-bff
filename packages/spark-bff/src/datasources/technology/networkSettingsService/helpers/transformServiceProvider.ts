import { definitions } from 'generated/typings/networkSettingsService';
import { NexusGenRootTypes } from 'generated/nexusTypes';

export function transformServiceProvider({
  serviceProvider: { id, name },
}: definitions['ServiceProviderResponse']): NexusGenRootTypes['ServiceProvider'] {
  if (!id || !name) {
    return null;
  }

  return {
    serviceProviderId: id,
    name,
  };
}
