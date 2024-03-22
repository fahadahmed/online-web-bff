import { NexusGenRootTypes } from 'generated/nexusTypes';
import { definitions } from 'generated/typings/productDetailServiceV2';
import { transformOfferDetails } from './productOffersById.helper';

export const transformExtras = ({
  category,
}: definitions['ExtrasByCategoryResponse']): NexusGenRootTypes['ExtrasResponse'] => {
  const { subCategories } = category;

  const extrasCategories = subCategories.reduce((prev, extrasCategory) => {
    if (extrasCategory.offerDetails?.length > 0) {
      prev.push({
        ...extrasCategory,
        offers: extrasCategory.offerDetails.map(transformOfferDetails),
      });
    }
    return prev;
  }, []);

  return {
    extrasCategories,
  };
};
