import { extractHeaderValue } from './requestUtils';

test('extracts header from request', () => {
  expect(
    extractHeaderValue({ 'test-header': 'test-value' }, 'test-header'),
  ).toBe('test-value');

  expect(
    extractHeaderValue(
      { 'test-header': ['test-value', 'another-test-value'] },
      'test-header',
    ),
  ).toBe('test-value');
});
