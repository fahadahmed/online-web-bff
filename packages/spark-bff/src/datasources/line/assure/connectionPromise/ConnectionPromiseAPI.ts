import { constructSuccessResponse, DESLDataSource } from 'datasources/common';
import { definitions } from 'generated/typings/connectionPromisePreference';
import { NexusGenInputs, NexusGenRootTypes } from 'generated/nexusTypes';
import { ApolloError } from 'apollo-server-fastify';
import {
  constructAddConnectionPromiseSuccessResponse,
  constructConnectionPromiseErrorResponse,
  constructDeleteConnectionPromiseResponse,
} from './helpers/connectionPromise.helper';

class ConnectionPromiseAPI extends DESLDataSource {
  constructor() {
    super('/v1/line');
  }

  async getConnectionPromiseLines(
    lineNumber: string,
  ): Promise<NexusGenRootTypes['ConnectionPromiseLinesResponse']> {
    return this.get<definitions['ConnectionPromiseLinesResponse']>(
      `/${lineNumber}/assure/promise`,
    ).then((connectionPromiseLinesResponse) => {
      return { lines: connectionPromiseLinesResponse.connectionPromiseLines };
    });
  }

  async addConnectionPromiseLine({
    lineNumber,
    primaryLine,
  }: NexusGenInputs['AddConnectionPromiseLineInput']): Promise<
    NexusGenRootTypes['AddConnectionPromiseLineResponse']
  > {
    const requestBodyParams = { lineNumber, primaryLine };
    return this.post<definitions['ConnectionPromiseLinesResponse']>(
      `/${lineNumber}/assure/promise`,
      requestBodyParams,
    )
      .then((response) => {
        return constructAddConnectionPromiseSuccessResponse(response);
      })
      .catch((error: ApolloError) => {
        return constructConnectionPromiseErrorResponse(error);
      });
  }

  async updateConnectionPromiseLine({
    lineNumber,
    primaryLine,
    connectionPromiseId,
  }: NexusGenInputs['UpdateConnectionPromiseLineInput']): Promise<
    NexusGenRootTypes['UpdateConnectionPromiseLineResponse']
  > {
    const requestBodyParams = { primaryLine };
    return this.patch<definitions['ConnectionPromiseLinesResponse']>(
      `/${lineNumber}/assure/promise/${connectionPromiseId}`,
      requestBodyParams,
    )
      .then((response) => {
        return constructSuccessResponse(response);
      })
      .catch((error: ApolloError) => {
        return constructConnectionPromiseErrorResponse(error);
      });
  }

  async deleteConnectionPromiseLine({
    lineNumber,
    connectionPromiseId,
  }: NexusGenInputs['DeleteConnectionPromiseLineInput']): Promise<
    NexusGenRootTypes['DeleteConnectionPromiseLineResponse']
  > {
    return this.delete<definitions['Response']>(
      `/${lineNumber}/assure/promise/${connectionPromiseId}`,
    )
      .then(() => {
        return constructDeleteConnectionPromiseResponse();
      })
      .catch((error: ApolloError) => {
        return constructConnectionPromiseErrorResponse(error);
      });
  }
}

export default ConnectionPromiseAPI;
