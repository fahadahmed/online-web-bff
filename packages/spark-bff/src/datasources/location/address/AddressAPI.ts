import { DESLDataSource } from 'datasources/common';
import { NexusGenRootTypes } from 'generated/nexusTypes';
import { definitions } from 'generated/typings/addressService';
import {
  mapSearchResponse,
  transformAddressDetailResponse,
} from './helpers/address.helper';

class AddressServiceAPI extends DESLDataSource {
  constructor() {
    super('/v1/location/address');
  }

  async getAddressSuggestions(
    partialAddress: string,
  ): Promise<NexusGenRootTypes['AddressSuggestion'][]> {
    const queryParams = {
      partialAddress,
    };
    const { addresses } = await this.get<definitions['AddressSearchResponse']>(
      `/results/search`,
      queryParams,
    );

    return mapSearchResponse(addresses);
  }

  async getAddressDetail(
    elid: string,
  ): Promise<NexusGenRootTypes['AddressDetail']> {
    const details = await this.get<definitions['AddressDetails']>(
      `/details/${elid}`,
    );

    return transformAddressDetailResponse(details);
  }
}

export default AddressServiceAPI;
