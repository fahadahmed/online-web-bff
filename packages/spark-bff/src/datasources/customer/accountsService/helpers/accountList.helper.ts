import { definitions } from 'generated/typings/accountService';
import { NexusGenRootTypes } from 'generated/nexusTypes';
import { convertToSegment } from 'utils/segment';

export const transformAccountListResponse = ({
  accounts,
}: definitions['AccountListResponse']): NexusGenRootTypes['AccountList'][] => {
  return accounts?.map(
    ({
      accountNumber,
      accountId,
      balanceManagement,
      businessName,
      customerNumber,
      customerSegment,
      firstName,
      lastName,
      inCollections,
      status,
      products,
    }) => {
      return {
        accountId,
        accountNumber,
        balanceManagement,
        businessName,
        firstName,
        lastName,
        customerNumber,
        customerSegment,
        segment: convertToSegment(customerSegment),
        inCollections,
        status,
        products: products.map(
          ({ assetId, lineNumber, offerId, offerName, productInstanceId }) => {
            return {
              assetId,
              lineNumber,
              offerId,
              offerName,
              productInstanceId,
              ifpEligible: balanceManagement === 'POSTPAID',
            };
          },
        ),
      };
    },
  );
};
