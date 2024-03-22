import {
  NexusGenEnums,
  NexusGenInputs,
  NexusGenRootTypes,
} from 'generated/nexusTypes';
import { formatQuery } from 'utils/query';
import { definitions } from 'generated/typings/a2PMessagingService';
import { constructSuccessResponse } from 'datasources/common';
import { isNotFound } from 'utils/responseErrors.utils';
import { A2PBaseAPI } from '../A2PBaseAPI';
import {
  constructAddServiceRequest,
  constructAddServiceRequestSuccessResponse,
} from './helpers/addServiceRequest.helper';
import {
  constructAddContentProviderResponse,
  constructModifyContentProviderResponse,
} from './helpers/addContentProvider.helper';
import { mapContentProviders } from './helpers/getContentProviders.helper';

/**
 * The A2P Messaging Customer API provides metrics to understand
 * the near-real time performance of message carriage including message
 * statuses, delivery rates, volumes and average delivery time for a given customer.
 */
class CustomerAPI extends A2PBaseAPI {
  constructor() {
    super('/v1/services/a2p-messaging/customers/');
  }

  public async getAdminOverview(
    dateRange: NexusGenEnums['A2PDateRange'],
  ): Promise<NexusGenRootTypes['A2PAdminOverview']> {
    return (
      await this.get<{
        overview: NexusGenRootTypes['A2PAdminOverview'];
      }>(`/overview`, {
        dateRange,
      })
    )?.overview;
  }

  public async getCustomerOverview(
    customerNumber: string,
    dateRange: NexusGenEnums['A2PDateRange'],
  ): Promise<NexusGenRootTypes['A2PCustomerOverview']> {
    return this.get<definitions['CustomerOverviewDatabaseResource']>(
      `/${customerNumber}/overview`,
      {
        dateRange,
      },
    )
      .then((response) => {
        return response.overview;
      })
      .catch((error) => {
        if (isNotFound(error)) {
          return {
            deliveredSmsCount: 0,
            failedSmsCount: 0,
            sentSmsCount: 0,
            totalSmsCount: 0,
          };
        }

        throw error;
      });
  }

  public async getUsage(
    customerNumber: string,
    dateRange: NexusGenEnums['A2PDateRange'],
  ): Promise<NexusGenRootTypes['A2PCustomerUsage']> {
    return this.get<{
      usage: NexusGenRootTypes['A2PCustomerUsage'];
    }>(`/${customerNumber}/usage`, {
      dateRange,
    })
      .then((response) => response.usage)
      .catch((error) => {
        if (isNotFound(error)) {
          return {
            series: [],
          };
        }

        throw error;
      });
  }

  public getShortcode(
    customerNumber: string,
    shortcode: string,
  ): Promise<NexusGenRootTypes['A2PCustomerShortcode']> {
    return this.get<NexusGenRootTypes['A2PCustomerShortcode']>(
      `/${customerNumber}/shortcodes/${shortcode}`,
    );
  }

  public async getShortcodes(
    customerNumber: string,
    dateRange: NexusGenEnums['A2PDateRange'],
  ): Promise<NexusGenRootTypes['A2PCustomerShortcodeListItem'][]> {
    const queryParameters = formatQuery({
      dateRange,
    });

    return (
      await this.get<{
        shortcodes: NexusGenRootTypes['A2PCustomerShortcodeListItem'][];
      }>(`/${customerNumber}/shortcodes`, queryParameters)
    )?.shortcodes;
  }

  public async getContentProviders(
    customerNumber: string,
  ): Promise<NexusGenRootTypes['A2PCustomerContentProvider'][]> {
    const response = await this.get<
      definitions['ContentProvidersDatabaseResource']
    >(`/${customerNumber}/content-providers`);

    return mapContentProviders(response);
  }

  public async getServiceRequests(
    customerNumber: string,
  ): Promise<NexusGenRootTypes['A2PCustomerServiceRequest'][]> {
    return (
      await this.get<{
        serviceRequests: NexusGenRootTypes['A2PCustomerServiceRequest'][];
      }>(`/${customerNumber}/service-requests`)
    )?.serviceRequests;
  }

  public addContentProvider(
    input: NexusGenInputs['A2PAddContentProviderRequest'],
  ): Promise<NexusGenRootTypes['A2PAddContentProviderResponse']> {
    const { customerNumber, ...body } = input;
    const requestBody: definitions['ContentProviderPostForm'] = body;

    return this.post<definitions['ContentProviderIdDatabaseResource']>(
      `/${customerNumber}/content-providers`,
      requestBody,
    ).then(constructAddContentProviderResponse);
  }

  public async addServiceRequest(
    input: NexusGenInputs['A2PAddServiceRequestRequest'],
  ): Promise<NexusGenRootTypes['A2PAddServiceRequestResponse']> {
    const requestBody = constructAddServiceRequest(input);

    return this.post<definitions['ServiceRequestIdDatabaseResource']>(
      `/${input.customerNumber}/service-requests`,
      requestBody,
    ).then(constructAddServiceRequestSuccessResponse);
  }

  public modifyShortcode(
    input: NexusGenInputs['A2PModifyShortcodeRequest'],
  ): Promise<NexusGenRootTypes['A2PModifyShortcodeResponse']> {
    const { customerNumber, shortcodeNumber, ...body } = input;

    return this.patch<definitions['Response']>(
      `/${customerNumber}/shortcodes/${shortcodeNumber}`,
      body,
    ).then(constructSuccessResponse);
  }

  public async modifyContentProvider(
    input: NexusGenInputs['A2PModifyContentProviderRequest'],
  ): Promise<NexusGenRootTypes['A2PStatusResponse']> {
    const { customerNumber, contentProviderId, ...body } = input;

    return this.put<definitions['Response']>(
      `/${customerNumber}/content-providers/${contentProviderId}`,
      body,
    ).then(constructModifyContentProviderResponse);
  }

  public async deleteContentProvider(
    input: NexusGenInputs['A2PDeleteContentProviderRequest'],
  ): Promise<NexusGenRootTypes['A2PStatusResponse']> {
    const { customerNumber, contentProviderId } = input;

    return this.delete<definitions['Response']>(
      `/${customerNumber}/content-providers/${contentProviderId}`,
    ).then(constructModifyContentProviderResponse);
  }
}

export default CustomerAPI;
