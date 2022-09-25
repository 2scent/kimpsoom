export default function calculatePremium({
  koreaPrice,
  foreignPrice,
  exchangeRate,
}: {
  koreaPrice?: number;
  foreignPrice?: number;
  exchangeRate?: number;
}): string {
  if (!koreaPrice || !foreignPrice || !exchangeRate) return '';

  return ((koreaPrice / (foreignPrice * exchangeRate)) * 100 - 100).toFixed(2);
}
