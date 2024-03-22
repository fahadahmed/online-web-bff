import { server as mockServer } from 'test/server';
import { getAvailableNumbersMock } from '../mocks/handlers';
import {
  availableNumberResponseCombiner,
  transformAvailableNumbers,
} from './availableNumbers.helper';
import mock1 from '../mocks/availableNumbersSetOne.mock.json';
import mock2 from '../mocks/availableNumbersSetTwo.mock.json';

beforeEach(() => {
  mockServer.use(getAvailableNumbersMock);
});
test('it finds the chunk index of the given lineNumber', () => {
  const lineNumber = mock1.lineNumbers[6];
  const { reservationId } = mock1;
  const { lineNumberReservationChunkIndex, lineNumberReservationChunks } =
    availableNumberResponseCombiner(
      lineNumber,
      reservationId,
      transformAvailableNumbers(mock1),
      transformAvailableNumbers(mock2),
    );

  const chunkIndex = 1;
  expect(lineNumberReservationChunks[chunkIndex]).toContainEqual({
    reservationId,
    lineNumber,
  });
  expect(lineNumberReservationChunkIndex).toEqual(chunkIndex);
});
