import { NexusGenRootTypes, NexusGenInputs } from 'generated/nexusTypes';
import { definitions } from 'generated/typings/paymentService';
import {
  DESLDataSource,
  constructSuccessResponse,
  constructErrorResponse,
} from 'datasources/common';
import {
  constructPoliPaySuccessResponse,
  buildPoliPaymentRequestBody,
  buildProcessCCPaymentWithRegisteredCardRequestBody,
  buildProcessNewCardOneOffBillPaymentRequestBody,
  buildProcessNewCardOneOffBillPaymentAndSaveCardRequestBody,
  buildProcessNewCardBillPaymentWithRegistrationRequestBody,
} from './helpers/billPayment.helper';

class BillPaymentAPI extends DESLDataSource {
  constructor() {
    super('/v1/finance/payment');
  }

  postPoliPayment(
    input: NexusGenInputs['PoliPayBillInput'],
  ): Promise<NexusGenRootTypes['PoliPayBillResponse']> {
    const { accountNumber } = input;
    const requestBodyParams = buildPoliPaymentRequestBody(input);
    return this.post<definitions['PoliPayResponse']>(
      `/polipay/bill/${accountNumber}`,
      requestBodyParams,
    )
      .then((response) => {
        return constructPoliPaySuccessResponse(response);
      })
      .catch((error) => {
        return constructErrorResponse(error);
      });
  }

  postCCPaymentWithRegisteredCard(
    input: NexusGenInputs['CreditCardBillPaymentRequestInput'],
  ) {
    const { accountNumber } = input;
    const requestBodyParams =
      buildProcessCCPaymentWithRegisteredCardRequestBody(input);
    return this.post<definitions['Response']>(
      `/creditcard/bill/${accountNumber}`,
      requestBodyParams,
    )
      .then(constructSuccessResponse)
      .catch(constructErrorResponse);
  }

  postNewCardOneoffBillPayment(
    input: NexusGenInputs['NewCardOneoffBillPaymentInput'],
    oneTimeToken: NexusGenInputs['CardDetailInput']['cardDetail']['oneTimeToken'],
  ) {
    const { accountNumber } = input;
    const requestBodyParams = buildProcessNewCardOneOffBillPaymentRequestBody(
      input,
      oneTimeToken,
      null,
    );
    return this.post<definitions['Response']>(
      `/creditcard/bill/${accountNumber}`,
      requestBodyParams,
    )
      .then(constructSuccessResponse)
      .catch(constructErrorResponse);
  }

  postNewCardOneoffBillPaymentAndSaveCard(
    input: NexusGenInputs['NewCardOneoffBillPaymentInput'],
    paymentMethodId: string,
  ) {
    const { accountNumber } = input;
    const requestBodyParams =
      buildProcessNewCardOneOffBillPaymentAndSaveCardRequestBody(
        input,
        null,
        paymentMethodId,
      );
    return this.post<definitions['Response']>(
      `/creditcard/bill/${accountNumber}`,
      requestBodyParams,
    )
      .then(constructSuccessResponse)
      .catch(constructErrorResponse);
  }

  postNewCardBillPaymentWithRegistration(
    input: NexusGenInputs['NewCardBillPaymentWithRegistrationInput'],
  ) {
    const { accountNumber } = input;
    const requestBodyParams =
      buildProcessNewCardBillPaymentWithRegistrationRequestBody(input);
    return this.post<definitions['Response']>(
      `/creditcard/bill/${accountNumber}`,
      requestBodyParams,
    )
      .then(constructSuccessResponse)
      .catch(constructErrorResponse);
  }

  deleteAutoPayBill(
    input: NexusGenInputs['DeleteAutoPayBillInput'],
  ): Promise<NexusGenRootTypes['DeleteAutoPayBillResponse']> {
    const { accountNumber, paymentMethodId } = input;
    return this.delete<definitions['Response']>(
      `/bill/${accountNumber}/paymentsetup/${paymentMethodId}`,
    )
      .then((response) => {
        return constructSuccessResponse(response);
      })
      .catch((error) => {
        return constructErrorResponse(error);
      });
  }
}

export default BillPaymentAPI;
