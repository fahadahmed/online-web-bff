import { NexusGenRootTypes } from 'generated/nexusTypes';
import { definitions } from 'generated/typings/productDetailServiceV2';

type OfferDetailType =
  definitions['FetchCompatibleGroupedSubscriptionProductDetailsResponse']['subscriptions'][0]['offerDetails'][0];
type CtaType =
  definitions['FetchCompatibleGroupedSubscriptionProductDetailsResponse']['subscriptions'][0]['ctas'][0];

const mapSubscriptionOfferDetail: (
  offerDetail: OfferDetailType,
) => NexusGenRootTypes['SubscriptionOffer']['offerDetails'][0] = ({
  id,
  category,
  group,
  images,
  associatedPriceRules,
  name,
  description,
  price,
  entitlements,
  promotions,
  productFeatures,
  productCharacteristics,
}) => {
  const mappedCategory = category?.map((c) => ({ categoryId: c.id, id }));

  const mappedGroup = group
    ? {
        id: group.id,
        groupId: group.id,
        name: group.name,
        description: group.description,
        sortOrder: group.sortOrder,
        isDefault: group.isDefault,
        images: group.images?.map(
          ({
            id: imageId,
            description: imageDescription,
            sortOrder,
            defaultUrl,
            zoomUrl,
            standardUrl,
            thumbnailUrl,
            tinyUrl,
            type,
          }) => ({
            id: imageId,
            imageId,
            description: imageDescription,
            sortOrder,
            defaultUrl,
            zoomUrl,
            standardUrl,
            thumbnailUrl,
            tinyUrl,
            type,
          }),
        ),
      }
    : undefined;

  const mappedImages = images?.map(
    ({
      id: imageId,
      description: imageDescription,
      sortOrder,
      defaultUrl,
      zoomUrl,
      standardUrl,
      thumbnailUrl,
      tinyUrl,
      type,
    }) => ({
      id: imageId,
      imageId,
      description: imageDescription,
      sortOrder,
      defaultUrl,
      zoomUrl,
      standardUrl,
      thumbnailUrl,
      tinyUrl,
      type,
    }),
  );

  const mappedAssociatedPriceRules = associatedPriceRules?.map(
    ({
      sources,
      description: priceRuleDescription,
      pricePointID,
      ruleType,
      price: priceRulePrice,
    }) => {
      return {
        sources: sources?.map(mapSubscriptionOfferDetail),
        description: priceRuleDescription,
        pricePointID,
        ruleType,
        price: priceRulePrice,
      };
    },
  );

  return {
    id,
    offerId: id,
    category: mappedCategory,
    group: mappedGroup,
    images: mappedImages,
    associatedPriceRules: mappedAssociatedPriceRules,
    name,
    description,
    price,
    entitlements,
    promotions,
    productFeatures,
    productCharacteristics: {
      ...productCharacteristics,
      balanceManagement: productCharacteristics.balanceManageMent,
    },
  };
};

const mapSubscriptionCta: (
  cta: CtaType,
) => NexusGenRootTypes['SubscriptionOffer']['ctas'][0] = ({ type, label }) => ({
  ctaType: type,
  label,
});

export function transformSubscriptionOffers(
  response: definitions['FetchCompatibleGroupedSubscriptionProductDetailsResponse'],
  groupId?: string,
): NexusGenRootTypes['SubscriptionOffer'][] {
  const result = response.subscriptions
    .filter(({ offerDetails }) => {
      if (groupId) {
        return offerDetails[0].group.id === groupId;
      }
      return true;
    })
    .map(({ offerDetails, ctas, name, lineNumbers, accountNumbers }) => ({
      offerDetails: offerDetails.map(mapSubscriptionOfferDetail),
      ctas: ctas?.map(mapSubscriptionCta),
      name,
      lineNumbers,
      accountNumbers,
    }));

  return result;
}
