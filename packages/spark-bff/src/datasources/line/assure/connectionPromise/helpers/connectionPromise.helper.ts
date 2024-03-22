import { definitions } from 'generated/typings/connectionPromisePreference';
import { NexusGenRootTypes } from 'generated/nexusTypes';
import {
  constructErrorResponse,
  constructSuccessResponse,
} from 'datasources/common';
import { ApolloError } from 'apollo-server-fastify';

export const constructAddConnectionPromiseSuccessResponse = (
  response: definitions['ConnectionPromiseLinesResponse'],
): NexusGenRootTypes['AddConnectionPromiseLineResponse'] => {
  const successResponse = constructSuccessResponse(response);
  const { connectionPromiseId } = response?.connectionPromiseLines[0];
  return { ...successResponse, connectionPromiseId };
};

const constructConnectionPromiseErrorMessage = (code: number) => {
  switch (code) {
    case 4041:
      return 'Connection Promise not supported for this line number.';
    case 4042:
      return 'The primary Connection Promise record cannot be deleted if a secondary record exists.';
    case 4043:
      return 'The primary Connection Promise cannot be changed to a secondary record.';
    case 401:
      return 'Request not authorized';
    default:
      return null;
  }
};

export const constructConnectionPromiseErrorResponse = (error: ApolloError) => {
  const { code, success } = constructErrorResponse(error);
  const message = constructConnectionPromiseErrorMessage(code);
  return { code, success, message };
};

export const constructDeleteConnectionPromiseResponse = () => {
  return { success: true, message: 'success', code: 2000 };
};
