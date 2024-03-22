import { formatQuery, formatPathWithQuery } from './query';

test('formatQuery removes null and undefined values in generated query string', () => {
  const query = {
    a: 'string-value',
    b: 12,
    c: null as unknown,
    d: undefined as unknown,
  };

  expect(formatQuery(query)).toBe('a=string-value&b=12');
});

test('formatPathWithQuery returns with query key and value in path', () => {
  expect(formatPathWithQuery('/v1/products', { offerId: 'abc' })).toBe(
    '/v1/products?offerId=abc',
  );
});

test('formatPathWithQuery returns with null values with just path', () => {
  expect(formatPathWithQuery('/v1/products', { offerId: null })).toBe(
    '/v1/products',
  );
});
