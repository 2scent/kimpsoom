type CalculatePremiumParams = {
  readonly koreanPrice?: number;
  readonly foreignPrice?: number;
  readonly exchangeRate?: number;
};

export default function calculatePremium({
  koreanPrice,
  foreignPrice,
  exchangeRate,
}: CalculatePremiumParams): string {
  if (!koreanPrice || !foreignPrice || !exchangeRate) return '';

  return ((koreanPrice / (foreignPrice * exchangeRate)) * 100 - 100).toFixed(2);
}
