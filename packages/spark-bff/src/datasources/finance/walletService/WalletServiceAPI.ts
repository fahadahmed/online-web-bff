import {
  constructErrorResponse,
  DESLDataSource,
  GenericResponseBody,
} from 'datasources/common';
import { NexusGenInputs, NexusGenRootTypes } from 'generated/nexusTypes';
import { definitions } from 'generated/typings/walletService';
import {
  BuildSaveCardRequestBodyParameter as SaveCardParameter,
  constructAddWalletPaymentSuccessResponse,
  buildAddBankAccountToWalletRequestBody,
  buildAddCreditCardToWalletRequestBody,
  buildSaveCardRequestBody,
  extractPaymentMethodId,
  getFilteredPaymentMethods,
} from './helpers/walletService.helper';

class WalletServiceAPI extends DESLDataSource {
  constructor() {
    super('/v1/finance/wallet');
  }

  async getWalletPaymentMethods(
    sources: definitions['BasePaymentMethodProperties']['source'][],
    associatedLineNumber: string,
  ) {
    const response = await this.get<definitions['PaymentMethodResponse']>(`me`);
    return getFilteredPaymentMethods(response, {
      sources,
      associatedLineNumber,
    });
  }

  /**
   *
   * @deprecated
   */
  postBankAccountToWallet(
    input: NexusGenInputs['BankAccountDetailInput'],
  ): Promise<NexusGenRootTypes['AddWalletPaymentMethodResponse']> {
    const reqBodyParams = buildAddBankAccountToWalletRequestBody(input);
    return this.post<definitions['SinglePaymentMethodResponse']>(
      `/me`,
      reqBodyParams,
    )
      .then((response) => {
        return constructAddWalletPaymentSuccessResponse(response);
      })
      .catch((error) => {
        return constructErrorResponse(error);
      });
  }

  postCreditCardToWallet(
    input: NexusGenInputs['CardDetailInput'],
  ): Promise<NexusGenRootTypes['AddWalletPaymentMethodResponse']> {
    const reqBodyParams = buildAddCreditCardToWalletRequestBody(input);
    return this.post<definitions['SinglePaymentMethodResponse']>(
      `/me`,
      reqBodyParams,
    )
      .then((response) => {
        return constructAddWalletPaymentSuccessResponse(response);
      })
      .catch((error) => {
        return constructErrorResponse(error);
      });
  }

  /**
   *
   * @returns a string representing the new paymentMethodId
   */
  saveCard(
    parameter: SaveCardParameter,
  ): Promise<string | GenericResponseBody> {
    return this.post<definitions['SinglePaymentMethodResponse']>(
      '/me',
      buildSaveCardRequestBody(parameter),
    )
      .then(extractPaymentMethodId)
      .catch(constructErrorResponse);
  }
}

export default WalletServiceAPI;
