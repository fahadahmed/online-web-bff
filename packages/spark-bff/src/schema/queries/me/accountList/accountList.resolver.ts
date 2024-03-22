import { createBatchResolver, ResolverFunction } from 'graphql-resolve-batch';
import { ContextType } from 'types';

type Sources = {
  assetId?: string;
  lineNumber?: string;
  offerId?: string;
  offerName?: string;
  productInstanceId?: string;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const resolveIfpEligible: ResolverFunction<
  Sources,
  any,
  ContextType,
  boolean
> = createBatchResolver(
  async (sources, _, { dataSources: { productOffersAPI } }) => {
    const { offerDetails } = await productOffersAPI.getProductOffersByOfferIds(
      sources.map(({ offerId }) => offerId),
    );

    return offerDetails.map(
      ({ productCharacteristics }) => productCharacteristics.isDeferrable,
    );
  },
);
