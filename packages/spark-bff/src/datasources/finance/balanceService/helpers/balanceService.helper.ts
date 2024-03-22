import { definitions } from 'generated/typings/balanceService';
import { NexusGenRootTypes } from 'generated/nexusTypes';

export const transformAccountDetails = (
  accountDetails?: definitions['BankAccountDetails'],
): NexusGenRootTypes['AccountDetails'] => {
  if (!accountDetails) {
    return null;
  }
  const {
    bank,
    accountName,
    accountNumber,
    accountNumberSuffix,
    bankNumber,
    branchNumber,
    branchName,
  } = accountDetails;
  return {
    bank,
    accountName,
    accountNumber,
    accountNumberSuffix,
    bankNumber,
    branchNumber,
    branchName,
  };
};

export const transformCreditCard = (
  creditCard?: definitions['CreditCardDetails'],
): NexusGenRootTypes['CreditCard'] => {
  if (!creditCard) {
    return null;
  }
  const {
    lastFourDigits,
    ccId,
    cardName,
    cardIssuer,
    expiryMonth,
    expiryYear,
  } = creditCard;
  return {
    lastFourDigits,
    ccId,
    cardName,
    cardIssuer,
    expiryMonth,
    expiryYear,
  };
};

export const transformLastBill = (
  lastBill?: definitions['LastBill'],
): NexusGenRootTypes['LastBill'] => {
  if (!lastBill) {
    return null;
  }
  const { billDate } = lastBill;
  return {
    billDate,
  };
};

export const mapMonthlyPaymentSetup = (
  monthlyPaymentSetup: definitions['MonthlyPaymentSetup'][],
) => {
  if (!monthlyPaymentSetup) {
    return null;
  }
  return monthlyPaymentSetup?.map(
    ({
      type,
      description,
      status,
      accountDetails,
      creditCard,
      upcomingPayment,
    }) => {
      return {
        type,
        description,
        status,
        accountDetails: transformAccountDetails(accountDetails),
        creditCard: transformCreditCard(creditCard),
        upcomingPayment,
      };
    },
  );
};

export const transformLastPayment = (
  lastPayment?: definitions['LastPayment'],
): NexusGenRootTypes['LastPayment'] => {
  if (!lastPayment) {
    return null;
  }
  const { paymentDate, paymentAmount } = lastPayment;
  return {
    paymentDate,
    paymentAmount,
  };
};

export const transformCtaDetail = (
  ctaDetails?: definitions['CtaDetails'],
): NexusGenRootTypes['OperationTypeCtaDetails'] => {
  if (!ctaDetails) {
    return null;
  }
  const { label, code } = ctaDetails;
  return {
    label,
    code,
  };
};

export const transformBalanceInformationMessage = (
  infoMessage?: definitions['InfoMessage'],
): NexusGenRootTypes['BalanceInformationMessage'] => {
  if (!infoMessage) {
    return null;
  }
  const {
    primary,
    secondary,
    tertiary,
    status,
    primaryCta,
    secondaryCta,
    otherCtas,
  } = infoMessage;
  return {
    primary,
    secondary,
    tertiary,
    status,
    primaryCta: transformCtaDetail(primaryCta),
    secondaryCta: transformCtaDetail(secondaryCta),
    otherCtas: otherCtas?.map(transformCtaDetail),
  };
};

export const transformAccountBalance = (
  accountBalanceDetails: definitions['AccountBalanceDetails'],
): NexusGenRootTypes['AccountBalance'] => {
  const {
    accountNumber,
    firstName,
    lastName,
    currentBalance,
    currentBillCycle,
    lastPayment,
    lastBill,
    nextBill,
    detailMessage,
    summaryMessage,
    monthlyPaymentSetup,
  } = accountBalanceDetails;
  return {
    accountNumber,
    firstName,
    lastName,
    currentBalance,
    currentBillCycle,
    lastPayment: transformLastPayment(lastPayment),
    nextBill,
    lastBill: transformLastBill(lastBill),
    monthlyPaymentSetup: mapMonthlyPaymentSetup(monthlyPaymentSetup),
    detailMessage: transformBalanceInformationMessage(detailMessage),
    summaryMessage: transformBalanceInformationMessage(summaryMessage),
  };
};
