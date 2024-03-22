import { definitions } from 'generated/typings/connectionDiagnosticsService';
import { NexusGenRootTypes } from 'generated/nexusTypes';
import { constructSuccessResponse } from 'datasources/common';

export const transformAvailableCTAs = (
  availableCTAs: definitions['AvailableCTA'][],
): NexusGenRootTypes['BroadbandDiagnosticsAvailableCTA'][] => {
  return availableCTAs.map(({ ctaLabel, ctaType, webCTALink }) => {
    return {
      label: ctaLabel,
      ctaType,
      webAction: webCTALink,
    };
  });
};

export const transformDiagnosticResults = (
  diagnosticResults: definitions['DiagnosticResult'][],
) => {
  return diagnosticResults.map(({ body, availableCTAs, ...rest }) => {
    return {
      desc: body[0],
      availableCTAs: transformAvailableCTAs(availableCTAs),
      ...rest,
    };
  });
};

export const constructBroadbandDiagnosticsResultsResponse = (
  diagnosticResultsResponse: definitions['DiagnosticResultsResponse'],
) => {
  const {
    testSuiteComplete,
    diagnosticResults,
    lineDetails: { modemModel },
    ...rest
  } = diagnosticResultsResponse;

  return {
    testSuiteCompleted: testSuiteComplete,
    results: transformDiagnosticResults(diagnosticResults),
    modemModel,
    ...rest,
  };
};

export const constructBroadbandDiagnosticsResultsSuccessResponse = (
  response: definitions['DiagnosticResultsResponse'],
): NexusGenRootTypes['BroadbandDiagnosticsResultsResponse'] => {
  const successResponse = constructSuccessResponse(response);
  const broadbandDiagnostics =
    constructBroadbandDiagnosticsResultsResponse(response);

  const diagnosticResultsSuccessResponse: NexusGenRootTypes['BroadbandDiagnosticsResultsResponse'] =
    {
      broadbandDiagnostics,
      ...successResponse,
    };

  return diagnosticResultsSuccessResponse;
};
