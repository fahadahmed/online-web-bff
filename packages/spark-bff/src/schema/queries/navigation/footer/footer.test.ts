import { createTestClient, gql } from 'test/apolloTestUtils';
import { server } from 'test/server';
import { contentMenuMockStub } from 'datasources/utility/content/mocks/handlers';

beforeEach(() => {
  server.use(contentMenuMockStub);
});

test('successfully retrieves the menu content for footer. ', async () => {
  const { query } = createTestClient();
  const res = await query({
    query: gql`
      query {
        footerContent(id: "online-shop/footer-menu") {
          footerLinkMenu {
            id
            heading
            url
            items {
              id
              label
              url
            }
          }
          footerLegalLinks {
            id
            label
            url
            iconName
          }
          footerSocialMediaLinks {
            id
            label
            url
            iconName
          }
        }
      }
    `,
  });

  expect(res.errors).toBeUndefined();
  expect(res.data!.footerContent).toMatchSnapshot();
});
