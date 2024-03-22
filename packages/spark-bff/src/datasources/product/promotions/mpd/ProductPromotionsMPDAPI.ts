import { DESLDataSource } from 'datasources/common';
import { NexusGenRootTypes } from 'generated/nexusTypes';
import { definitions } from 'generated/typings/productDetailServiceV2';
import {
  constructProductPromotionsMPDRequestBody,
  transformProductPromotionsMPD,
} from './helpers/productPromotionsMPD.helpers';

type ProductPromotionsMPDResponse =
  definitions['FetchMultipleProductDiscountPromotionsDetailsResponse'];
class ProductPromotionsMPDAPI extends DESLDataSource {
  constructor() {
    super('/v1/products');
  }

  async getProductPromotionsMPD(
    offerIds: string[],
  ): Promise<NexusGenRootTypes['MpdPromotionsResponse']> {
    const requestBody = constructProductPromotionsMPDRequestBody(offerIds);

    return this.post<ProductPromotionsMPDResponse>(
      `/promotions/mpd/search`,
      requestBody,
    ).then(transformProductPromotionsMPD);
  }
}

export default ProductPromotionsMPDAPI;
