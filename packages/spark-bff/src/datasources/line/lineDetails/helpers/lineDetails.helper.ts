import { NexusGenEnums } from 'generated/nexusTypes';
import { definitions } from 'generated/typings/lineDetailsService';

type CustomerSegment = NexusGenEnums['CustomerSegment'];

export const mapAssociatedPlanDetails = (response: definitions['LinePlan']) => {
  const customerSegment: CustomerSegment =
    response.customerSegment === 'Consumer' ? 'Consumer' : 'Business';

  const {
    balanceManagement,
    contractEndDate,
    legalCategory,
    lineOfBusiness,
    offerId,
    price,
    productId,
    productName,
    planType,
  } = response;

  return {
    balanceManagement,
    contractEndDate,
    customerSegment,
    legalCategory,
    lineOfBusiness,
    offerId,
    planType,
    price,
    productId,
    productName,
    showPricesIncludingGST: customerSegment === 'Consumer',
  };
};
