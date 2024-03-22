import { list, nullable, objectType, queryField, stringArg } from 'nexus';

export const LineNumberReservation = objectType({
  name: 'LineNumberReservation',
  definition(t) {
    t.string('reservationId');
    t.string('lineNumber');
  },
});
export const AvailableNumbersResponse = objectType({
  name: 'AvailableNumbersResponse',
  definition(t) {
    t.list.field('lineNumberReservations', {
      type: LineNumberReservation,
      deprecation: 'use lineNumberReservationChunks',
    });
    t.list.field('lineNumberReservationChunks', {
      type: list(LineNumberReservation),
    });
    t.list.string('lineNumbers', {
      deprecation: 'use lineNumberReservationChunks',
    });
    t.int('lineNumberReservationChunkIndex');
    t.string('reservationId', {
      deprecation: 'use lineNumberReservationChunks',
    });
    t.nullable.string('lineNumber');
    t.string('pagingId', { deprecation: 'use lineNumberReservationChunks' });
    t.string('message', { deprecation: 'use graphql errors' });
    t.int('code', { deprecation: 'use graphql errors' });
    t.boolean('success', { deprecation: 'use graphql errors' });
  },
});

export const AvailableNumbersQuery = queryField('availableNumbers', {
  type: AvailableNumbersResponse,
  args: {
    reservationId: nullable(stringArg()),
    lineNumber: nullable(stringArg()),
  },
  description: 'Gets initial batch of available numbers',
  async resolve(
    _,
    { reservationId, lineNumber },
    { dataSources: { availableNumbersAPI } },
  ) {
    return availableNumbersAPI.getAvailableNumbers({
      reservationId,
      lineNumber,
    });
  },
});
