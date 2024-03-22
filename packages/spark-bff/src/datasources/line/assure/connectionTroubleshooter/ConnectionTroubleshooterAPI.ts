import { DESLDataSource } from 'datasources/common';
import { definitions } from 'generated/typings/connectionTroubleshooterService';
import { NexusGenRootTypes } from 'generated/nexusTypes';
import { formatQuery } from 'utils/query';
import { transformTroubleshooterResponse } from './helpers/connectionTroubleshooter.helper';

class ConnectionTroubleshooterAPI extends DESLDataSource {
  constructor() {
    super('/v1/line');
  }

  async getTroubleshooterResponse(
    lineNumber: string,
    diagnosticCode: string,
    modemModel?: string,
  ): Promise<
    NexusGenRootTypes['BroadbandTroubleshooterResultsResponse']
  > | null {
    const queryParameters = formatQuery({ modemModel });
    const troubleshooterResponse = await this.get<
      definitions['TroubleshooterResultsResponse']
    >(`/${lineNumber}/assure/troubleshoot/${diagnosticCode}`, queryParameters);

    return transformTroubleshooterResponse(troubleshooterResponse);
  }
}

export default ConnectionTroubleshooterAPI;
