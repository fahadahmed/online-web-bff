import { DESLDataSource } from 'datasources/common';
import { definitions } from 'generated/typings/networkSettingsService';
import { transformServiceProvider } from './helpers';

class NetworkSettingsAPI extends DESLDataSource {
  constructor() {
    super('/v1/technology');
  }

  async getServiceProvider(lineNumber: string) {
    return this.get<definitions['ServiceProviderResponse']>(
      `/mobile/${lineNumber}/provider`,
    )
      .then(transformServiceProvider)
      .catch(() => null);
  }
}

export default NetworkSettingsAPI;
