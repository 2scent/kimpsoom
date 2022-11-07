interface CalculateKimpParams {
  readonly koreanPrice?: number;
  readonly foreignPrice?: number;
  readonly exchangeRate?: number;
}

export default function calculateKimp({
  koreanPrice,
  foreignPrice,
  exchangeRate,
}: CalculateKimpParams): string {
  if (!koreanPrice || !foreignPrice || !exchangeRate) return '';

  return ((koreanPrice / (foreignPrice * exchangeRate)) * 100 - 100).toFixed(2);
}
