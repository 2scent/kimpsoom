type CalculatePremiumParams = {
  readonly koreaPrice?: number;
  readonly foreignPrice?: number;
  readonly exchangeRate?: number;
};

export default function calculatePremium({
  koreaPrice,
  foreignPrice,
  exchangeRate,
}: CalculatePremiumParams): string {
  if (!koreaPrice || !foreignPrice || !exchangeRate) return '';

  return ((koreaPrice / (foreignPrice * exchangeRate)) * 100 - 100).toFixed(2);
}
