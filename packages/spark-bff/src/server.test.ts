import { createTestClient, gql } from 'test/apolloTestUtils';
import { server, rest } from 'test/server';

jest.mock('./context', () => ({
  __esModule: true,
  default: () => ({
    forwardedHeaders: { Cookie: 'test-cookie=test-cookie-value' },
    loggerMeta: {},
  }),
}));

test('server forwards Cookie header while calling DESL', async () => {
  let resolveResult: (value: { [key: string]: string }) => void;
  const result = new Promise((resolve) => {
    resolveResult = resolve;
  });

  server.use(
    rest.get('*', async ({ cookies }, res, ctx) => {
      resolveResult(cookies);
      return res(ctx.status(400), ctx.json({}));
    }),
  );
  const { query } = createTestClient();
  await query({
    query: gql`
      query {
        resource(resourceId: "12345") {
          isNumberIdentified
        }
      }
    `,
  });

  await expect(result).resolves.toStrictEqual({
    'test-cookie': 'test-cookie-value',
  });
});
