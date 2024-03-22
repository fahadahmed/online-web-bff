import { rest } from 'msw';
import accessoriesDetailsMockResponse from './accessories.mock.json';
import audioDetailsMockResponse from './audio.mock.json';
import categoriesWithoutSubcategoriesResponse from './categoriesWithoutSubcategories.mock.json';
import dataLoversDetailsMockResponse from './dataLoversDetails.mock.json';
import dataPlansDetailsMockResponse from './dataPlansDetails.mock.json';
import eligibleLinesMockResponse from './eligibleLinesMockResponse.json';
import endlessDetailsMockResponse from './endlessDetails.mock.json';
import gamingDetailsMockResponse from './gaming.mock.json';
import goldDetailsMockResponse from './goldDetails.mock.json';
import handsetDetailsBusinessMockResponse from './handsetBusinessVariant.json';
import handsetDetailsMockResponse from './handset.mock.json';
import hardwareSubcategoriesMockResponse from './hardwareSubcategories.mock.json';
import postpaidDetailsMockResponse from './postpaidDetails.mock.json';
import postpaidExtraDetailsMockResponse from './postpaidExtraDetails.mock.json';
import prepaidDetailsMockResponse from './prepaidDetails.mock.json';
import prepaidExtraDetailsMockResponse from './prepaidExtraDetails.mock.json';
import productVariantsMockMandotoryFiledsOnlyResponse from './productVariantsWithMandatoryFieldsOnly.json';
import productVariantsMockResponse from './productVariants.mock.json';
import productVariantsMockWearable from './productVariantsWearable.mock.json';
import productVariantsMockWearableSpacetalkWatch from './productVariantsWearableSpacetalkWatch.json';
import rolloverDetailsMockResponse from './rolloverDetails.mock.json';
import tabletsDetailsMockResponse from './tablets.mock.json';
import valuePacksDetailsMockResponse from './valuePacksDetails.mock.json';
import wearableDetailsMockResponse from './wearableDetails.mock.json';
import wearablesMockResponse from './wearables.mock.json';
import wearableDetailsSamsungWatchMockResponse from './productVariantsWearablesSamsungWatch.mock.json';
import wearableDetailsAppleWatchMockResponse from './productVariantsWearablesAppleWatch.mock.json';

const baseUrl = 'http://testhost/v1/products';

export const getAccessoriesDetailsMock = rest.get(
  `${baseUrl}/category/accessories/details`,
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(accessoriesDetailsMockResponse));
  },
);

export const getAudioDetailsMock = rest.get(
  `${baseUrl}/category/headphones/details`,
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(audioDetailsMockResponse));
  },
);

export const getGamingDetailsMock = rest.get(
  `${baseUrl}/category/gaming/details`,
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(gamingDetailsMockResponse));
  },
);

export const getTabletsDetailsMock = rest.get(
  `${baseUrl}/category/tablets/details`,
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(tabletsDetailsMockResponse));
  },
);

export const getWearablesDetailsMock = rest.get(
  `${baseUrl}/category/handsets/details`,
  async (req, res, ctx) => {
    const channel = req.url.searchParams.get('channel');

    if (channel === 'businessshop') {
      return res(ctx.status(200), ctx.json(handsetDetailsBusinessMockResponse));
    }
    return res(ctx.status(200), ctx.json(handsetDetailsMockResponse));
  },
);

export const getHandsetDetailsMock = rest.get(
  `${baseUrl}/category/handsets/details`,
  async (req, res, ctx) => {
    const channel = req.url.searchParams.get('channel');

    if (channel === 'businessshop') {
      return res(ctx.status(200), ctx.json(handsetDetailsBusinessMockResponse));
    }
    return res(ctx.status(200), ctx.json(handsetDetailsMockResponse));
  },
);

export const getPostpaidDetailsMock = rest.get(
  `${baseUrl}/category/postpaid/details`,
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(postpaidDetailsMockResponse));
  },
);

export const getPrepaidDetailsMock = rest.get(
  `${baseUrl}/category/prepaid/details`,
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(prepaidDetailsMockResponse));
  },
);

export const getAddonPrepaidDetailsMock = rest.get(
  `${baseUrl}/category/addon_prepaid/details`,
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(prepaidDetailsMockResponse));
  },
);

export const getDataPlansDetailsMock = rest.get(
  `${baseUrl}/category/data_plan/details`,
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(dataPlansDetailsMockResponse));
  },
);

export const getEligibleLinesMock = rest.get(
  `${baseUrl}/eligibility/wearables/:offerId/me/lines`,
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(eligibleLinesMockResponse));
  },
);

export const getEndlessDetailsMock = rest.get(
  `${baseUrl}/category/endless_plans/details`,
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(endlessDetailsMockResponse));
  },
);

export const getPrepaidExtrasDetailsMock = rest.get(
  `${baseUrl}/category/prepaid_extra/details`,
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(prepaidExtraDetailsMockResponse));
  },
);

export const getPostpaidExtrasDetailsMock = rest.get(
  `${baseUrl}/category/postpaid_extra/details`,
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(postpaidExtraDetailsMockResponse));
  },
);

export const getCategoriesWithoutSubcategoriesMock = rest.get(
  `${baseUrl}/category/prepaid_extra/details`,
  async (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(categoriesWithoutSubcategoriesResponse),
    );
  },
);

export const getRolloverDetailsMock = rest.get(
  `${baseUrl}/category/rollover_plan/details`,
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(rolloverDetailsMockResponse));
  },
);

export const getGoldDetailsMock = rest.get(
  `${baseUrl}/category/gold_plan/details`,
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(goldDetailsMockResponse));
  },
);

export const getWearableDetailsMock = rest.get(
  `${baseUrl}/category/wearable_plan/details`,
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(wearableDetailsMockResponse));
  },
);

export const getWearablesMock = rest.get(
  `${baseUrl}/category/wearables/details`,
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(wearablesMockResponse));
  },
);

export const getDataLoversDetailsMock = rest.get(
  `${baseUrl}/category/prepaid_datalovers/details`,
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(dataLoversDetailsMockResponse));
  },
);

export const getValuePacksDetailsMock = rest.get(
  `${baseUrl}/category/prepaid_value_pack/details`,
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(valuePacksDetailsMockResponse));
  },
);

export const getHardwareDetailsMock = rest.get(
  `${baseUrl}/category/hardware/details`,
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(hardwareSubcategoriesMockResponse));
  },
);

export const getProductVariantsByGroupId = rest.get(
  `${baseUrl}/group/:groupId/variants`,
  async (req, res, ctx) => {
    const { groupId } = req.params;
    if (groupId === 'watch') {
      return res(ctx.status(200), ctx.json(productVariantsMockWearable));
    }
    if (groupId === 'spacetalk_kids_smartphone_watch_and_gps') {
      return res(
        ctx.status(200),
        ctx.json(productVariantsMockWearableSpacetalkWatch),
      );
    }
    if (groupId === 'apple_watch_se_44mm_group') {
      return res(
        ctx.status(200),
        ctx.json(wearableDetailsAppleWatchMockResponse),
      );
    }
    if (groupId === 'samsung_galaxy_watch4_lte') {
      return res(
        ctx.status(200),
        ctx.json(wearableDetailsSamsungWatchMockResponse),
      );
    }
    if (groupId === 'mandatory-fields-only') {
      return res(
        ctx.status(200),
        ctx.json(productVariantsMockMandotoryFiledsOnlyResponse),
      );
    }
    return res(ctx.status(200), ctx.json(productVariantsMockResponse));
  },
);

const handlers = [
  getAccessoriesDetailsMock,
  getAddonPrepaidDetailsMock,
  getAudioDetailsMock,
  getDataLoversDetailsMock,
  getDataPlansDetailsMock,
  getEligibleLinesMock,
  getEndlessDetailsMock,
  getGamingDetailsMock,
  getGoldDetailsMock,
  getHandsetDetailsMock,
  getHardwareDetailsMock,
  getPostpaidDetailsMock,
  getPrepaidDetailsMock,
  getPrepaidExtrasDetailsMock,
  getPostpaidExtrasDetailsMock,
  getProductVariantsByGroupId,
  getRolloverDetailsMock,
  getTabletsDetailsMock,
  getValuePacksDetailsMock,
  getWearableDetailsMock,
  getWearablesMock,
];

export default handlers;
