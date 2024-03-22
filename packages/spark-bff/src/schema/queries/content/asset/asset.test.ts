import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { contentAssetDetailsMock } from 'datasources/utility/content/mocks/handlers';

beforeEach(() => {
  server.use(contentAssetDetailsMock);
});

test('successfully retrieves the content asset details for a tag. ', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        contentAsset(
          tags: "terms"
          type: "TextContent"
          format: "text"
          filters: "channel:web"
        ) {
          assets {
            content {
              assetType
              format
              type
              text
              linkName
            }
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.contentAsset).toMatchSnapshot();
});
