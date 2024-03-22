import { NexusGenInputs, NexusGenRootTypes } from 'generated/nexusTypes';
import { definitions } from 'generated/typings/productDetailServiceV2';

const ACCESSORY_CATEGORIES = ['accessories'];
const INSURANCE_CATEGORIES = [
  'mobile_insurance_standard',
  'mobile_insurance_premium',
  'insurance',
];
const VAS_CATEGORIES = [
  'mobile_netflix',
  'mobile_spotify',
  'spark_sport',
  'neon',
  'mobile_vas',
  'account_vas',
];

export const constructCompatibleProductsRequestBody = (
  input: NexusGenInputs['CompatibleProductsInput'],
) => {
  const { categoryId, offerIds } = input;
  return {
    simulated: true,
    bundles: [
      {
        categoryId,
        items: offerIds.map((singleOfferId) => ({
          offeringId: singleOfferId,
        })),
      },
    ],
  };
};

export const transformRelatedPlans = (
  relatedPlansResponse: definitions['FetchCompatibleProductDetailsResponse'],
): NexusGenRootTypes['RelatedPlansResponse'] => {
  const { bundles } = relatedPlansResponse;

  return {
    bundles,
  };
};

type Product =
  definitions['FetchCompatibleProductDetailsResponse']['bundles'][0]['offerDetails'][0];

type RelatedProduct = NexusGenRootTypes['AddonOfferDetail'];

function isProductWithinCategories(
  product: Product,
  searchCategories: string[],
) {
  return product.category?.some((category) =>
    searchCategories.includes(category.id),
  );
}

function filterProductsByCategories(
  products: RelatedProduct[],
  searchCategories: string[],
) {
  return products.filter((product) =>
    isProductWithinCategories(product, searchCategories),
  );
}

export const transformRelatedAddons = (
  relatedAddonsResponse: definitions['FetchCompatibleProductDetailsResponse'],
): NexusGenRootTypes['AddonsProducts'] => {
  const productsWithBundleIds = relatedAddonsResponse.bundles.flatMap(
    (bundle) => {
      return bundle.offerDetails.map((product) => ({
        ...product,
        offerId: product.id,
        bundleId: bundle.id,
        isAccountLevel: bundle.id === 'simulated',
        categoryIdentifier: product.category
          .map((productCategory) => productCategory.id)
          .join(','),
      }));
    },
  );

  const accessoryBundles = filterProductsByCategories(
    productsWithBundleIds,
    ACCESSORY_CATEGORIES,
  );

  const insuranceBundles = filterProductsByCategories(
    productsWithBundleIds,
    INSURANCE_CATEGORIES,
  );

  const vasBundles = filterProductsByCategories(
    productsWithBundleIds,
    VAS_CATEGORIES,
  );

  return {
    accessoryBundles,
    vasBundles,
    insuranceBundles,
  };
};
