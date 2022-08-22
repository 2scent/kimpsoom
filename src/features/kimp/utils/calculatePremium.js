export default function calculatePremium({
  koreaPrice,
  foreignPrice,
  exchangeRate,
}) {
  if (!koreaPrice || !foreignPrice || !exchangeRate) return '';

  return ((koreaPrice / (foreignPrice * exchangeRate)) * 100 - 100).toFixed(2);
}
