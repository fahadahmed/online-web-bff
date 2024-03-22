import { DESLDataSource } from 'datasources/common';
import { NexusGenRootTypes } from 'generated/nexusTypes';
import { definitions } from 'generated/typings/productDetailServiceV2';
import { formatPathWithQuery } from 'utils';
import { transformProductFilters } from './helpers/productFilters.helpers';

type ProductFiltersResponse = definitions['ProductFilterResponse'];
class ProductFiltersAPI extends DESLDataSource {
  constructor() {
    super('/v1/products');
  }

  async getProductFilters(
    categoryId: string,
    channel: string,
  ): Promise<NexusGenRootTypes['DeviceGalleryFilter'][]> {
    const path = formatPathWithQuery(`/category/${categoryId}/filters`, {
      channel,
    });

    return this.get<ProductFiltersResponse>(path).then(transformProductFilters);
  }
}

export default ProductFiltersAPI;
