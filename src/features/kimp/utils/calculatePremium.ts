import { Coin } from '@/shared/models';

export default function calculatePremium({
  koreaPrice,
  foreignPrice,
  exchangeRate,
}: Partial<Coin>): string {
  if (!koreaPrice || !foreignPrice || !exchangeRate) return '';

  return ((koreaPrice / (foreignPrice * exchangeRate)) * 100 - 100).toFixed(2);
}
