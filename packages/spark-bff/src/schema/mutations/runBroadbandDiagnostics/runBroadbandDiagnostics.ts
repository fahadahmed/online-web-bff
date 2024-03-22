import { enumType, inputObjectType, mutationField, objectType } from 'nexus';

const BroadbandDiagnosticsTestSuiteType = enumType({
  name: 'BroadbandDiagnosticsTestSuiteType',
  members: ['FIBRE_CHORUS', 'FIBRE_OTHER', 'COPPER', 'WIRELESS_BB'],
  description: 'The type of diagnostic test suite run against the line number.',
});

const BroadbandDiagnosticsTestType = enumType({
  name: 'BroadbandDiagnosticsTestType',
  members: ['NETWORK', 'ACCESS_POINT', 'CONNECTIVITY'],
  description: ' The type of diagnostic test performed',
});

const BroadbandDiagnosticsCtaType = enumType({
  name: 'BroadbandDiagnosticsCtaType',
  members: ['CONNECTION_TROUBLESHOOTER', 'CHAT', 'DIAGNOSTIC_CHECK'],
  description:
    'The cta type will allow for mapping to be done on the presentation side to ensure the correct CTA can be presented',
});

export const BroadbandDiagnosticsAvailableCTA = objectType({
  name: 'BroadbandDiagnosticsAvailableCTA',
  description: 'Object having fields for availableCTA',
  definition(t) {
    t.string('label', {
      description: 'The label for the CTA.',
    });
    t.field('ctaType', {
      type: BroadbandDiagnosticsCtaType,
      description:
        'The cta type will allow for mapping to be done on the presentation side to ensure the correct CTA can be presented',
    });
    t.nullable.string('webAction', {
      description: 'The web link for the article CTA.',
    });
  },
});

export const BroadbandDiagnosticsResult = objectType({
  name: 'BroadbandDiagnosticsResult',
  description: 'object having fields for diagnostic result',
  definition(t) {
    t.field('testType', {
      type: BroadbandDiagnosticsTestType,
      description: 'The type of diagnostic test performed',
    });
    t.string('testLabel', {
      description:
        'The customer-facing label associated with the diagnostic test result',
    });
    t.boolean('testExecuted', {
      description:
        'A flag indicated whether this particular diagnostic test has been executed or was not performed due to connectivity issues identified earlier.',
    });
    t.boolean('testPassed', {
      description:
        'A flag indicating whether the diagnostic test has been completed successfully.',
    });
    t.nullable.string('diagnosticSummaryCode', {
      description:
        'If an issue was encountered during the execution of this test, this attribute is the key that represents the nature of the issue experienced.',
    });
    t.nullable.string('title', {
      description: 'The title/headline of the diagnostic result',
    });
    t.nullable.string('desc', {
      description:
        'Description text that summarises the result of the test and call to action options.',
    });
    t.list.field('availableCTAs', {
      type: BroadbandDiagnosticsAvailableCTA,
      description:
        'A list of Call To Actions (CTA) representing the next steps the customer can take to resolve their connection issue. If no relevant CTAs are possible for this troubleshooting step then an empty availableCTAs list will be returned.',
    });
  },
});

const BroadbandDiagnostics = objectType({
  name: 'BroadbandDiagnostics',
  definition(t) {
    t.nullable.field('testSuiteType', {
      type: BroadbandDiagnosticsTestSuiteType,
      description:
        'The type of diagnostic test suite run against the line number.',
    });
    t.nullable.boolean('testSuiteCompleted', {
      description:
        'For the v1 implementation, it will always return true. Included as a future-proofing option.',
    });
    t.string('modemModel', {
      description: 'The gateway modem model if known',
    });
    t.nullable.list.field('results', {
      type: BroadbandDiagnosticsResult,
      description:
        'A list of diagnostic results. If there are no results then an empty array will be returned.',
    });
  },
});

export const BroadbandDiagnosticsResultsResponse = objectType({
  name: 'BroadbandDiagnosticsResultsResponse',
  description:
    'interface containing fields for diagnosticResults mutation response.',
  definition(t) {
    t.implements('GenericMutationResponse');
    t.nullable.field('broadbandDiagnostics', {
      type: BroadbandDiagnostics,
    });
  },
});

export const RunBroadbandDiagnosticsInput = inputObjectType({
  name: 'RunBroadbandDiagnosticsInput',
  description: 'Detail object of run broadband diagnostics input data',
  definition(t) {
    t.string('serviceGuidingId', {
      description: 'The line number on which to run the broadband diagnostics',
    });
  },
});

export const RunBroadbandDiagnostics = mutationField(
  'runBroadbandDiagnostics',
  {
    type: BroadbandDiagnosticsResultsResponse,
    description: 'Initiate a series of downstream diagnostic checks for a line',
    args: { input: RunBroadbandDiagnosticsInput },
    resolve(
      _,
      { input: { serviceGuidingId } },
      { dataSources: { connectionDiagnosticsAPI } },
    ) {
      return connectionDiagnosticsAPI.runBroadbandDiagnostics(serviceGuidingId);
    },
  },
);
