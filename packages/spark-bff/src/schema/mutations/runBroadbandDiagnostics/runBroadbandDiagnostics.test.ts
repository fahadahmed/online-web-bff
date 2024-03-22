import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { runConnectionDiagnosticsMock } from 'datasources/line/assure/connectionDiagnostics/mocks/handlers';

beforeEach(() => {
  server.resetHandlers(runConnectionDiagnosticsMock);
});

test('returns success response for running broadband diagnostics', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        runBroadbandDiagnostics(input: { serviceGuidingId: "099991111" }) {
          broadbandDiagnostics {
            testSuiteType
            testSuiteCompleted
            modemModel
            results {
              testType
              testLabel
              testExecuted
              testPassed
              diagnosticSummaryCode
              title
              desc
              availableCTAs {
                label
                ctaType
                webAction
              }
            }
          }
          success
          message
          code
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.runBroadbandDiagnostics).toMatchSnapshot();
});

test('returns error response for unsupported line number', async () => {
  const { mutate } = createTestClient();
  const res = await mutate({
    mutation: gql`
      mutation {
        runBroadbandDiagnostics(input: { serviceGuidingId: "123456" }) {
          broadbandDiagnostics {
            testSuiteType
            testSuiteCompleted
            modemModel
            results {
              testType
              testLabel
              testExecuted
              testPassed
              diagnosticSummaryCode
              title
              desc
              availableCTAs {
                label
                ctaType
                webAction
              }
            }
          }
          success
          message
          code
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.runBroadbandDiagnostics).toMatchSnapshot();
});
