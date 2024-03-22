import { DESLDataSource } from 'datasources/common';
import { NexusGenRootTypes } from 'generated/nexusTypes';
import { definitions } from 'generated/typings/usageTransactionsService';
import { formatQuery } from 'utils/query';

class UsageTransactionAPI extends DESLDataSource {
  constructor() {
    super('/v1/line/usage/me');
  }

  async getUsageTransaction(
    lineNumber: string,
    start?: string,
    end?: string,
    size?: string,
  ): Promise<NexusGenRootTypes['LineUsageTransactions'] | null> {
    const queryParameters = formatQuery({
      start,
      end,
      size,
    });

    const usageTransaction = await this.get<definitions['UsageTransactions']>(
      `/${lineNumber}/transactions`,
      queryParameters,
    );
    return usageTransaction;
  }
}
export default UsageTransactionAPI;
