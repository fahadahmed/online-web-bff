import { definitions } from 'generated/typings/lineDetailsService';

export const mapLineAllowances = (response: definitions['LineAllowances']) => {
  const {
    dataStackAllowances,
    entitlements,
    extras,
    rolloverDetails,
    sharePlanDetails,
    speedAllowances,
  } = response;
  return {
    dataStackAllowances,
    entitlements,
    extras,
    rolloverDetails,
    sharePlanDetails,
    speedAllowances,
  };
};
