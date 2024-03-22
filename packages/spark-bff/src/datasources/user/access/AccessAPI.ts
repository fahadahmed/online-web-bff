import { DESLDataSource } from 'datasources/common';
import { definitions } from 'generated/typings/accessServiceV2';
import {
  NexusGenEnums,
  NexusGenFieldTypes,
  NexusGenInputs,
  NexusGenRootTypes,
  NexusGenArgTypes,
} from 'generated/nexusTypes';

import {
  constructErrorResponse,
  constructSuccessResponse,
} from 'datasources/common/genericResponse.helper';

import {
  constructAddAccountAccessSuccessResponse,
  constructAddAccountAccessErrorResponse,
  constructAddLineAccessSuccessResponse,
  constructAddLineAccessErrorResponse,
  extractLinesFromAccounts,
  filterAccounts,
  reduceAccounts,
  transformLines,
} from './helpers/access.helper';

class AccessAPI extends DESLDataSource {
  constructor() {
    super('/v2/user/access');
  }

  private async getUserAccessResponse() {
    return this.get<definitions['AccessResponse']>('/me');
  }

  async getAssociatedUsers(
    number: string,
    type: 'line' | 'account',
    input: NexusGenArgTypes['Line']['associatedUsers'],
  ) {
    const options = input
      ? {
          includeNotFoundRecords: input.includeNotFound,
          includeRevokedAccess: input.includeRevoked,
          includePendingAccess: input.includePending,
        }
      : undefined;
    const { access } = await this.get<definitions['AccessPermissionResponse']>(
      `/${type}/${number}`,
      options,
    );
    return access.map((accessObject) => {
      const { uuid, ...otherAccessProperties } = accessObject;
      return {
        ...otherAccessProperties,
        entityID: uuid,
      };
    });
  }

  async getAccounts(status: string) {
    const { accounts } = await this.getUserAccessResponse();
    return reduceAccounts(filterAccounts(accounts, status));
  }

  async getLines(accessLevel?: NexusGenEnums['LineAccessLevelType']) {
    const { accounts, lines } = await this.getUserAccessResponse();

    const accountLevelLines: Array<
      NexusGenRootTypes['Line'] & Partial<NexusGenFieldTypes['Line']>
    > = accessLevel === 'LINE_LEVEL' ? [] : extractLinesFromAccounts(accounts);

    return accountLevelLines.concat(transformLines(lines));
  }

  addAccountAccess({
    accountNumber,
    ...optionalParams
  }: NexusGenInputs['AddAccountAccessInput']): Promise<
    NexusGenRootTypes['AddAccountAccessResponse']
  > {
    const requestBodyParams = {
      accountNumber,
      authorisation: { ...optionalParams },
    };
    return this.post<definitions['Response']>('/me/account', requestBodyParams)
      .then((response) => {
        return constructAddAccountAccessSuccessResponse(response);
      })
      .catch((error) => {
        return constructAddAccountAccessErrorResponse(error);
      });
  }

  addLineAccess(
    lineNumber: string,
    balanceManagement: string,
    authorisationCode?: string,
  ): Promise<NexusGenRootTypes['AddLineAccessResponse']> {
    const requestBodyParams = {
      lineNumber,
      authorisation: { balanceManagement, authCode: authorisationCode },
    };
    return this.post<definitions['Response']>('/me/line', requestBodyParams)
      .then((response) => {
        return constructAddLineAccessSuccessResponse(
          response,
          balanceManagement,
        );
      })
      .catch((error) => {
        return constructAddLineAccessErrorResponse(error, balanceManagement);
      });
  }

  async getLineByNumber(lineNumber: string) {
    const lines = await this.getLines();
    const selectedLine = lines.find((line) => line?.lineNumber === lineNumber);
    if (!selectedLine) {
      throw new Error(`User does not have access to this line`);
    }

    return selectedLine;
  }

  async revokeAccess({
    entityID,
    type,
    number,
  }: NexusGenInputs['RevokeAccessInput']): Promise<
    NexusGenRootTypes['RevokeAccessResponse']
  > {
    try {
      const response = await this.delete<definitions['Response']>(
        `/${entityID}/${type.toLowerCase()}/${number}`,
      );
      return constructSuccessResponse(response);
    } catch (error) {
      return constructErrorResponse(error);
    }
  }
}

export default AccessAPI;
