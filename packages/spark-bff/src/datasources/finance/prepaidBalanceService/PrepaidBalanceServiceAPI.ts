import { DESLDataSource } from 'datasources/common';
import { definitions } from 'generated/typings/balanceService';
import { transformPrepaidBalance } from './helpers/prepaidBalanceService.helper';

class PrepaidBalanceServiceAPI extends DESLDataSource {
  constructor() {
    super('/v1/finance/balance');
  }

  async getPrepaidBalance(lineNumber: string) {
    const prepaidBalanceDetails = await this.get<
      definitions['PrepaidBalanceResponse']
    >(`/prepaid/${lineNumber}`);
    return transformPrepaidBalance(prepaidBalanceDetails);
  }
}

export default PrepaidBalanceServiceAPI;
