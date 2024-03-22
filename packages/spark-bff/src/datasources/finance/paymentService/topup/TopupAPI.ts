import {
  constructErrorResponse,
  constructSuccessResponse,
  DESLDataSource,
} from 'datasources/common';
import { definitions } from 'generated/typings/paymentService';
import { NexusGenInputs, NexusGenRootTypes } from 'generated/nexusTypes';
import {
  constructCCTopupSuccessResponse,
  buildSetPrepaidAutoTopupAndSaveCardRequestBody,
  buildCCTopupPaymentAndSaveCardRequestBody,
  buildCCTopupPaymentRequestBody,
  buildSetPrepaidAutoTopupWithRegisteredCardRequestBody,
  buildCCTopupPaymentWithRegisteredCardRequestBody,
  constructVoucherTopupSuccessResponse,
  constructVoucherTopupErrorResponse,
} from './helpers/topup.helper';
import { constructPoliPaySuccessResponse } from '../billPayment/helpers/billPayment.helper';

class TopupAPI extends DESLDataSource {
  constructor() {
    super('/v1/finance/payment');
  }

  async postCreditCardTopupPaymentAndSaveCard(
    input: NexusGenInputs['CreditCardTopupInput'],
    lineNumber: string,
    paymentMethodId: string,
  ): Promise<NexusGenRootTypes['CreditCardTopupResponse']> {
    const requestBodyParams = buildCCTopupPaymentAndSaveCardRequestBody(
      input,
      paymentMethodId,
      null,
    );

    return this.post<definitions['CreditCardTopupResponse']>(
      `/creditcard/topup/${lineNumber}`,
      requestBodyParams,
    )
      .then(constructCCTopupSuccessResponse)
      .catch(constructErrorResponse);
  }

  async postCreditCardTopupPayment(
    input: NexusGenInputs['CreditCardTopupInput'],
    lineNumber: string,
    oneTimeToken: NexusGenInputs['CardDetailInput']['cardDetail']['oneTimeToken'],
  ): Promise<NexusGenRootTypes['CreditCardTopupResponse']> {
    const requestBodyParams = buildCCTopupPaymentRequestBody(
      input,
      oneTimeToken,
    );

    return this.post<definitions['CreditCardTopupResponse']>(
      `/creditcard/topup/${lineNumber}`,
      requestBodyParams,
    )
      .then(constructCCTopupSuccessResponse)
      .catch(constructErrorResponse);
  }

  async postCreditCardTopupPaymentWithRegisteredCard(
    input: NexusGenInputs['CreditCardTopupInput'],
    lineNumber: string,
  ): Promise<NexusGenRootTypes['CreditCardTopupResponse']> {
    const requestBodyParams =
      buildCCTopupPaymentWithRegisteredCardRequestBody(input);
    return this.post<definitions['CreditCardTopupResponse']>(
      `/creditcard/topup/${lineNumber}`,
      requestBodyParams,
    )
      .then(constructCCTopupSuccessResponse)
      .catch(constructErrorResponse);
  }

  async processVoucherPayment(
    input: NexusGenInputs['VoucherPaymentInput'],
  ): Promise<NexusGenRootTypes['VoucherTopupResponse']> {
    const { lineNumber, voucherNumber } = input;
    const requestBodyParams = {
      voucherNumber,
      clientType: 'CQ_MOBILE',
    };
    return this.post<definitions['VoucherTopupResponse']>(
      `/voucher/topup/${lineNumber}`,
      requestBodyParams,
    )
      .then(constructVoucherTopupSuccessResponse)
      .catch(constructVoucherTopupErrorResponse);
  }

  async setPrepaidAutoTopupAndSaveCard(
    input: NexusGenInputs['AutoTopupInput'],
    paymentMethodId: string,
  ): Promise<NexusGenRootTypes['AutoTopupResponse']> {
    const { lineNumber } = input;
    const requestBodyParams = buildSetPrepaidAutoTopupAndSaveCardRequestBody(
      input,
      paymentMethodId,
    );
    return this.post<definitions['Response']>(
      `/creditcard/autotopup/${lineNumber}`,
      requestBodyParams,
    )
      .then(constructSuccessResponse)
      .catch(constructErrorResponse);
  }

  async setPrepaidAutoTopupWithRegisteredCard(
    input: NexusGenInputs['AutoTopupInput'],
  ): Promise<NexusGenRootTypes['AutoTopupResponse']> {
    const { lineNumber } = input;
    const requestBodyParams =
      buildSetPrepaidAutoTopupWithRegisteredCardRequestBody(input);
    return this.post<definitions['Response']>(
      `/creditcard/autotopup/${lineNumber}`,
      requestBodyParams,
    )
      .then(constructSuccessResponse)
      .catch(constructErrorResponse);
  }

  async processTopupPoliPay(
    input: NexusGenInputs['TopupPoliPayBillInput'],
  ): Promise<NexusGenRootTypes['PoliPayBillResponse']> {
    const { lineNumber, ...rest } = input;
    const requestBodyParams = { ...rest, clientType: 'CQ_DESKTOP' };
    return this.post<definitions['PoliPayResponse']>(
      `/polipay/topup/${lineNumber}`,
      requestBodyParams,
    )
      .then(constructPoliPaySuccessResponse)
      .catch(constructErrorResponse);
  }

  async deleteAutoTopup(
    input: NexusGenInputs['DeleteAutoTopupInput'],
  ): Promise<NexusGenRootTypes['DeleteAutoTopupResponse']> {
    const { lineNumber } = input;
    return this.delete<definitions['Response']>(
      `/creditcard/autotopup/${lineNumber}`,
    )
      .then(constructSuccessResponse)
      .catch(constructErrorResponse);
  }
}

export default TopupAPI;
