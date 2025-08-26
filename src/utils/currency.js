export const formatCurrency = (amount, locale = 'en-NG', currency = 'NGN') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const convertPrice = (usdPrice, targetCurrency = 'NGN') => {
  const rates = {
    NGN: 1650,
    USD: 1,
    GBP: 0.79,
    EUR: 0.85,
  };
  return (parseFloat(usdPrice) * rates[targetCurrency]).toFixed(0);
};