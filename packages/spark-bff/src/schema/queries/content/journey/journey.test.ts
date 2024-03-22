import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { contentJourneyResponseMocks } from 'datasources/utility/content/mocks/handlers';

beforeEach(() => {
  server.use(contentJourneyResponseMocks);
});

test('successfully retrieves the content for journey id myspark/profile. ', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        contentJourneyDetails(journeyStepId: "myspark/profile") {
          key
          value
          type
          url
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.contentJourneyDetails).toMatchSnapshot();
});

test('When the fragment is not added in AEM or invalid journey ID', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        contentJourneyDetails(journeyStepId: "invalidJourneyID") {
          key
          value
          type
          url
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.contentJourneyDetails).toMatchInlineSnapshot(`Array []`);
});
