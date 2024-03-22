import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { contentMenuMockStub } from 'datasources/utility/content/mocks/handlers';

beforeEach(() => {
  server.use(contentMenuMockStub);
});

test('validate headerContent query returns menus with no errors', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        headerContent(id: "online-shop/header-menu") {
          personalCategories {
            iconName
            label
          }
          businessCategories {
            iconName
            label
          }
          personalCategoriesDesktop {
            iconName
            label
          }
          businessCategoriesDesktop {
            iconName
            label
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchSnapshot();
});
