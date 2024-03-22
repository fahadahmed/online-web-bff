import { DESLDataSource } from 'datasources/common';

import { NexusGenEnums, NexusGenRootTypes } from 'generated/nexusTypes';
import { definitions } from 'generated/typings/productDetailServiceV2';
import {
  transformEligibleLines,
  transformProductDetails,
  transformProductGalleryDetails,
  transformSubcategoriesResponseBody,
} from './helpers/productDetails.helper';
import { transformProductVariants } from './helpers/productVariants.helper';

type ProductDetailsResponse = definitions['ProductDetailByCategoryResponse'];
type ProductVariantResponse = definitions['ProductVariantResponse'];
type EligibleLines = definitions['EligibleLines'];

class ProductDetailsAPI extends DESLDataSource {
  constructor() {
    super('/v1/products');
  }

  private getProductDetails(
    categoryId: string,
    queryParams: {
      channel: string;
      recursiveSearch?: boolean;
      includePriceRules?: boolean;
    },
  ): Promise<ProductDetailsResponse> {
    return this.get<ProductDetailsResponse>(
      `/category/${categoryId}/details`,
      queryParams,
    );
  }

  async getTransformedProductDetails(
    categoryId: string,
    channel: string,
    recursiveSearch = false,
  ): Promise<NexusGenRootTypes['ProductDetailsResponse']> {
    const productDetails = await this.getProductDetails(categoryId, {
      channel,
      recursiveSearch,
    });

    return transformProductDetails(productDetails);
  }

  async getSubcategories(
    anchorCategoryId: string,
    channel: string,
  ): Promise<NexusGenRootTypes['Subcategory'][]> {
    const productDetails = await this.getProductDetails(anchorCategoryId, {
      channel,
      recursiveSearch: true,
    });

    return transformSubcategoriesResponseBody(productDetails);
  }

  async getDeviceGalleryProducts(
    categoryId: string,
    channel: string,
  ): Promise<NexusGenRootTypes['DeviceGalleryProduct'][]> {
    const productDetails = await this.getProductDetails(categoryId, {
      channel,
      includePriceRules: true,
    });

    return transformProductGalleryDetails(productDetails);
  }

  async getEligibleLines(
    offerId: string,
    channel: NexusGenEnums['CartChannel'],
    accountNumber?: string,
  ): Promise<NexusGenRootTypes['EligibleLine'][]> {
    const body = await this.get<EligibleLines>(
      `/eligibility/wearables/${offerId}/me/lines`,
      {
        accountNumber,
        channel,
      },
    );
    return transformEligibleLines(body);
  }

  async getProductVariantsByGroupId(
    groupId: string | null,
    offerId: string,
  ): Promise<NexusGenRootTypes['ProductVariantsResponse']> {
    if (groupId) {
      const productVariants = await this.get<ProductVariantResponse>(
        `/group/${groupId}/variants`,
      );
      return transformProductVariants(productVariants);
    }

    const singleProduct = await this.get<
      definitions['ProductDetailByOfferIdsResponse']
    >(`/offers/details`, { offerIds: offerId, includePriceRules: true });

    return transformProductVariants(singleProduct);
  }
}

export default ProductDetailsAPI;
