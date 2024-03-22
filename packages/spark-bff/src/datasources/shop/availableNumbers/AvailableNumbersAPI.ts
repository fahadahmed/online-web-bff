import { DESLDataSource } from 'datasources/common';
import { NexusGenRootTypes } from 'generated/nexusTypes';
import { definitions } from 'generated/typings/numberReservationService';
import { formatQuery } from 'utils/query';
import {
  transformAvailableNumbers,
  constructAvailableNumberFailureResponse,
  availableNumberResponseCombiner,
} from './helpers/availableNumbers.helper';

type AvailableNumbersResponse = definitions['MobileNumbersResponse'];
type NexusAvailableNumbers = NexusGenRootTypes['AvailableNumbersResponse'];

interface GetAvailableNumbersParameter {
  lineNumber?: string;
  reservationId?: string;
}
class AvailableNumbersAPI extends DESLDataSource {
  constructor() {
    super('/v1/shop/');
  }

  async fetchAvailableNumbers(
    reservationId?: string,
  ): Promise<NexusAvailableNumbers> {
    const pagingId = '0'; // consult a backend developer before changing
    const numberBatch = await this.get<AvailableNumbersResponse>(
      'numbers/mobile',
      formatQuery({ reservationId, pagingId }),
    );
    return transformAvailableNumbers(numberBatch);
  }

  async getAvailableNumbers({
    reservationId,
    lineNumber,
  }: GetAvailableNumbersParameter): Promise<NexusAvailableNumbers> {
    try {
      const availableNumbers = await this.fetchAvailableNumbers(reservationId);
      const moreAvailableNumbers = await this.fetchAvailableNumbers(null);
      const combinedAvailableNumbers = availableNumberResponseCombiner(
        lineNumber,
        reservationId,
        availableNumbers,
        moreAvailableNumbers,
      );
      return { ...moreAvailableNumbers, ...combinedAvailableNumbers };
    } catch (error) {
      return constructAvailableNumberFailureResponse(error);
    }
  }
}

export default AvailableNumbersAPI;
