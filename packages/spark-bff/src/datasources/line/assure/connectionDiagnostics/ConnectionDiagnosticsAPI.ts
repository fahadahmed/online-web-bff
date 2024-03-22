import { constructErrorResponse, DESLDataSource } from 'datasources/common';
import { definitions } from 'generated/typings/connectionDiagnosticsService';
import { NexusGenRootTypes } from 'generated/nexusTypes';
import { constructBroadbandDiagnosticsResultsSuccessResponse } from './helpers/connectionDiagnostics.helper';

class ConnectionDiagnosticsAPI extends DESLDataSource {
  constructor() {
    super('/v1/line');
  }

  async runBroadbandDiagnostics(
    lineNumber: string,
  ): Promise<NexusGenRootTypes['BroadbandDiagnosticsResultsResponse']> {
    return this.post<definitions['DiagnosticResultsResponse']>(
      `/${lineNumber}/assure/diagnostics`,
    )
      .then((response) => {
        return constructBroadbandDiagnosticsResultsSuccessResponse(response);
      })
      .catch((error) => {
        return constructErrorResponse(error);
      });
  }
}

export default ConnectionDiagnosticsAPI;
