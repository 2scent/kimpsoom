import { useQuery } from '@tanstack/react-query';

import { fetchBybitCoins } from '../services/api';

export default function useBybitCoins() {
  return useQuery(
    ['bybitCoins'],
    fetchBybitCoins,
    {
      select: (coins) => coins.filter((coin) => coin.quote_currency === 'USDT'),
    },
  );
}
