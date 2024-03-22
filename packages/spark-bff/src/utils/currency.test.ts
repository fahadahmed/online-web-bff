import { formatNZD, parseNZD } from './currency';

test('format whole number 80 to 2 dp', () => {
  const result = formatNZD(80);
  expect(result).toEqual(`$80.00`);
});

test('format whole number 10 to 2dp', () => {
  const result = formatNZD(10, 2);
  expect(result).toEqual(`$10.00`);
});

test('format number 1 dp to 2 dp', () => {
  const result = formatNZD(5.9);
  expect(result).toEqual(`$5.90`);
});

test('format number 2 dp to 2 dp', () => {
  const result = formatNZD(5.97);
  expect(result).toEqual(`$5.97`);
});

test('format number 3 dp to 2 dp', () => {
  const result = formatNZD(5.979);
  expect(result).toEqual(`$5.98`);
});

test('format number 3 dp to 1 dp', () => {
  const result = formatNZD(5.779, 1);
  expect(result).toEqual(`$5.8`);
});

test('format number 3 dp to whole number', () => {
  const result = formatNZD(5.979, 0);
  expect(result).toEqual(`$6`);
});

test('parse NZD string to number', () => {
  const result = parseNZD('$9.99');
  expect(result).toEqual(9.99);
});
