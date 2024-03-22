import { DESLDataSource } from 'datasources/common';
import { definitions } from 'generated/typings/balanceService';
import { transformAccountBalance } from './helpers/balanceService.helper';

class BalanceServiceAPI extends DESLDataSource {
  constructor() {
    super('/v1/finance/balance');
  }

  async getAccountBalance(accountNumber: string) {
    const accountBalanceDetails = await this.get<
      definitions['AccountBalanceDetails']
    >(`/account/${accountNumber}`);
    return transformAccountBalance(accountBalanceDetails);
  }
}

export default BalanceServiceAPI;
