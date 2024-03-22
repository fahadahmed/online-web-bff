import { ApolloError } from 'apollo-server-fastify';
import { chunk, findIndex } from 'lodash';
import {
  constructSuccessResponse,
  constructErrorResponse,
} from 'datasources/common';
import { NexusGenRootTypes } from 'generated/nexusTypes';
import { definitions } from 'generated/typings/numberReservationService';

type AvailableNumbersResponse = definitions['MobileNumbersResponse'];
type NexusAvailableNumbers = NexusGenRootTypes['AvailableNumbersResponse'];

export const transformAvailableNumbers = (
  availableNumbersResponse: AvailableNumbersResponse,
): NexusAvailableNumbers => {
  const constructedDESLResponse = constructSuccessResponse(
    availableNumbersResponse,
  );

  const { message, code, success } = constructedDESLResponse;
  const { lineNumbers, reservationId, paging } = availableNumbersResponse;

  return {
    lineNumbers,
    reservationId,
    pagingId: paging,
    message,
    code,
    success,
    lineNumber: null,
    lineNumberReservationChunkIndex: 0,
    lineNumberReservationChunks: [],
    lineNumberReservations: lineNumbers.map((lineNumber) => ({
      lineNumber,
      reservationId,
    })),
  };
};

const findMatchingLineNumber = (
  reservationId: string,
  lineNumber: string,
  ...responses: NexusAvailableNumbers[]
) => {
  const matchingResponse = responses.find(
    (response) => response.reservationId === reservationId,
  );
  if (matchingResponse)
    return matchingResponse.lineNumbers.find(
      (lineNum) => lineNumber === lineNum,
    );
  return null;
};
const MAX_PAGES = 3;
const MAX_PER_PAGE = 5;
const chunkify = (
  lineNumbers: Array<{ lineNumber: string; reservationId: string }>,
) => {
  return chunk(lineNumbers, MAX_PER_PAGE).slice(0, MAX_PAGES);
};
export const availableNumberResponseCombiner = (
  lineNumber: string,
  reservationId: string,
  availableNumbers: NexusAvailableNumbers,
  moreAvailableNumbers: NexusAvailableNumbers,
) => {
  const allLineNumbers = [
    ...availableNumbers.lineNumbers,
    ...moreAvailableNumbers.lineNumbers,
  ];
  const matchingLineNumber = findMatchingLineNumber(
    reservationId,
    lineNumber,
    availableNumbers,
    moreAvailableNumbers,
  );
  const lineNumberReservations = [
    ...availableNumbers.lineNumberReservations,
    ...moreAvailableNumbers.lineNumberReservations,
  ];
  const lineNumberReservationChunks = chunkify(lineNumberReservations);
  const lineNumberReservationChunkIndex = findIndex(
    lineNumberReservationChunks,
    (chunkLineNumbers) => {
      const foundChunk = chunkLineNumbers.find(
        (reservation) =>
          reservation.lineNumber === lineNumber &&
          reservation.reservationId === reservationId,
      );
      return Boolean(foundChunk);
    },
  );
  return {
    lineNumber: matchingLineNumber,
    lineNumberReservationChunkIndex,
    lineNumbers: allLineNumbers,
    lineNumberReservations,
    lineNumberReservationChunks,
  };
};

export const constructAvailableNumberFailureResponse = (
  error: ApolloError,
): NexusAvailableNumbers => {
  return {
    ...constructErrorResponse(error),
    lineNumberReservationChunks: [],
    lineNumberReservationChunkIndex: 0,
    lineNumber: null,
    lineNumbers: [],
    pagingId: '0',
    reservationId: '0',
    lineNumberReservations: [],
  };
};
