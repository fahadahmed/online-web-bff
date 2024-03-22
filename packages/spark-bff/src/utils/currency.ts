export const formatNZD = (value: number, numDecimals: number = 2) => {
  return new Intl.NumberFormat('en-NZ', {
    style: 'currency',
    currency: 'NZD',
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: numDecimals,
    minimumFractionDigits: numDecimals,
  }).format(value);
};

export const parseNZD = (amount: string) => {
  return parseFloat(amount.replace(/\$|,/g, ''));
};
