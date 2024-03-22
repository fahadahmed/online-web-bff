import {
  DESLDataSource,
  constructSuccessResponse,
  constructErrorResponse,
} from 'datasources/common';
import { NexusGenInputs, NexusGenRootTypes } from 'generated/nexusTypes';
import { definitions } from 'generated/typings/airPoints';
import { getAirpointsInfo } from './helpers/airpoints.helper';

class AirpointsAPI extends DESLDataSource {
  constructor() {
    super('/v1/services/airpoints');
  }

  async getAirpointsData(accountNumber: string) {
    const airpointsInfo = await this.get<definitions['AirpointsDetails']>(
      `/${accountNumber}`,
    );
    return getAirpointsInfo(airpointsInfo);
  }

  addAirpoints(
    input: NexusGenInputs['AddAirpointsInput'],
  ): Promise<NexusGenRootTypes['AirpointsUpdateResponse']> {
    const {
      accountNumber,
      airpointsNumber,
      firstName,
      lastName,
      status = 'Active',
    } = input;
    return this.post<definitions['Response']>(`/${accountNumber}`, {
      airpointsNumber,
      firstName,
      lastName,
      status,
    })
      .then((response) => {
        return constructSuccessResponse(response);
      })
      .catch((error) => {
        return constructErrorResponse(error);
      });
  }

  deleteAirpoints(
    input: NexusGenInputs['DeleteAirpointsInput'],
  ): Promise<NexusGenRootTypes['AirpointsDeleteResponse']> {
    const { accountNumber, status = 'Inactive' } = input;
    return this.post<definitions['Response']>(`/${accountNumber}`, { status })
      .then((response) => {
        return constructSuccessResponse(response);
      })
      .catch((error) => {
        return constructErrorResponse(error);
      });
  }
}

export default AirpointsAPI;
