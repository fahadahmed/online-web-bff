import { DESLDataSource } from 'datasources/common';
import { NexusGenObjects } from 'generated/nexusTypes';
import { definitions } from 'generated/typings/contentService';
import { formatQuery } from 'utils/query';
import {
  transformContentAssets,
  transformContentJourneyList,
  transformFooterContent,
  transformHeaderContent,
} from './helpers/contentService.helper';

const basePath = 'utility/content';
const v1Path = `/v1/${basePath}`;
const v2Path = `/v2/${basePath}`;

class ContentServiceAPI extends DESLDataSource {
  constructor() {
    super('');
  }

  async getContentAsset(
    tags: string,
    type?: string,
    format?: string,
    referenceFilters?: string,
  ) {
    const queryParams = {
      tags,
      type,
      format,
      referenceFilters,
    };

    const contentAssetResponse = await this.get<
      definitions['AssetsV2Response']
    >(`${v2Path}/assets`, queryParams);

    const assets = transformContentAssets(contentAssetResponse);

    return { assets };
  }

  async getContentJourneyDetails(id: string, variation?: string) {
    const queryParameters = formatQuery({ id, variation });

    try {
      const contentDetailResponse = await this.get<
        definitions['JourneyDetailResponse']
      >(`${v1Path}/journey`, queryParameters);
      return transformContentJourneyList(contentDetailResponse);
    } catch {
      return [];
    }
  }

  async getFooterContent(
    id: string,
    variation?: string,
    site?: string,
  ): Promise<NexusGenObjects['FooterContentResponse']> {
    const queryParameters = formatQuery({ id, variation, site });
    const deslResponse = await this.get<definitions['FooterMenuResponse']>(
      `${v1Path}/menu`,
      queryParameters,
    );

    return transformFooterContent(deslResponse);
  }

  async getHeaderContent(
    id: string,
    variation?: string,
    site?: string,
  ): Promise<NexusGenObjects['HeaderContent']> {
    const queryParametersPersonal = formatQuery({
      id,
      variation: 'master',
      site,
    });
    const queryParametersBusiness = formatQuery({
      id,
      variation: 'business',
      site,
    });

    const personalHeaderRequest = this.get<definitions['FooterMenuResponse']>(
      `${v1Path}/menu`,
      queryParametersPersonal,
    );
    const businessHeaderRequest = this.get<definitions['FooterMenuResponse']>(
      `${v1Path}/menu`,
      queryParametersBusiness,
    );

    const [deslResponse, deslBusinessResponse] = await Promise.all([
      personalHeaderRequest,
      businessHeaderRequest,
    ]);

    return transformHeaderContent(deslResponse, deslBusinessResponse);
  }
}

export default ContentServiceAPI;
