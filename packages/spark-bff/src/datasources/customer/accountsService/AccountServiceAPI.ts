import { DESLDataSource } from 'datasources/common';
import { NexusGenRootTypes } from 'generated/nexusTypes';
import { definitions } from 'generated/typings/accountService';
import { isForbidden, isUnauthenticated } from 'utils/responseErrors.utils';
import {
  transformAccountSummaryResponse,
  transformAccountListResponse,
} from './helpers';

class AccountServiceAPI extends DESLDataSource {
  constructor() {
    super('/v1/customer/account');
  }

  async getAccountSummary(accountId: string) {
    const accountSummaryResponse = await this.get<
      definitions['AccountSummaryResponse']
    >(`/${accountId}/summary`);

    return transformAccountSummaryResponse(accountSummaryResponse);
  }

  async getAccountList(): Promise<NexusGenRootTypes['AccountList'][]> {
    return this.get<definitions['AccountListResponse']>(`/me/list`)
      .then(transformAccountListResponse)
      .catch((error) => {
        if (isUnauthenticated(error) || isForbidden(error)) {
          return [];
        }
        throw error;
      });
  }
}

export default AccountServiceAPI;
