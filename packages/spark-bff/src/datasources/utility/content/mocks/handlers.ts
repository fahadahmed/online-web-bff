import { rest } from 'msw';
import { definitions } from 'generated/typings/contentService';

import contentJourneyNotFound from './contentJourneys/content-journey-not-found.mock.json';

import contentAssetPrepaidBillingHelp from './content-asset-prepaid-billing-help.mock.json';
import contentAssetGeneric from './content-asset-generic.mock.json';

import contentMenuFailedResponse from './content-menu-error.json';
import contentMenuFooterResponse from './content-menu-footer.json';
import contentMenuFooterVariationResponse from './content-menu-footer-variation.json';
import contentMenuHeaderMasterResponse from './content-menu-header-master.json';
import contentMenuHeaderVariationResponse from './content-menu-header-variation.json';
import { JOURNEY_MOCKS_MYSPARK } from './contentJourneys/myspark';
import { JOURNEY_MOCKS_SHOP } from './contentJourneys/shop';

const baseUrlV1 = 'http://testhost/v1/utility/content';
const baseUrlV2 = 'http://testhost/v2/utility/content';

export const contentAssetDetailsMock = rest.get(
  `${baseUrlV2}/assets`,
  async (req, res, ctx) => {
    const query = req.url.searchParams;
    const tags = query.get('tags');
    if (tags === 'speedextra070007') {
      return res(ctx.status(200), ctx.json(contentAssetGeneric));
    }
    return res(ctx.status(200), ctx.json(contentAssetPrepaidBillingHelp));
  },
);

interface MocksKeyValuePair {
  [key: string]: Object;
}
export const contentJourneyResponseMocks = rest.get<
  definitions['JourneyDetailResponse']
>(`${baseUrlV1}/journey`, async (req, res, ctx) => {
  const query = req.url.searchParams;
  const journeyStepId = query.get('id');
  const contentMocks: MocksKeyValuePair = {
    ...JOURNEY_MOCKS_MYSPARK,
    ...JOURNEY_MOCKS_SHOP,
  };

  if (contentMocks[journeyStepId]) {
    return res(ctx.status(200), ctx.json(contentMocks[journeyStepId]));
  }

  return res(ctx.status(404), ctx.json(contentJourneyNotFound));
});

export const contentMenuMockStub = rest.get<definitions['FooterMenuResponse']>(
  `${baseUrlV1}/menu`,
  async (req, res, ctx) => {
    const id = req.url.searchParams.get('id');
    const variation = req.url.searchParams.get('variation');

    if (id === 'online-shop/footer-menu') {
      if (variation === 'marketing-test') {
        return res(
          ctx.status(200),
          ctx.json(contentMenuFooterVariationResponse),
        );
      }
      return res(ctx.status(200), ctx.json(contentMenuFooterResponse));
    }
    if (id === 'online-shop/header-menu') {
      if (variation === 'business') {
        return res(
          ctx.status(200),
          ctx.json(contentMenuHeaderVariationResponse),
        );
      }
      return res(ctx.status(200), ctx.json(contentMenuHeaderMasterResponse));
    }

    return res(ctx.status(404), ctx.json(contentMenuFailedResponse));
  },
);

const handlers = [
  contentAssetDetailsMock,
  contentJourneyResponseMocks,
  contentMenuMockStub,
];

export default handlers;
