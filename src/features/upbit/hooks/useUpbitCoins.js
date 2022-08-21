import { useQuery } from '@tanstack/react-query';

import fetchUpbitCoins from '../api/fetchUpbitCoins';

export default function useUpbitCoins() {
  return useQuery(
    ['upbitCoins'],
    fetchUpbitCoins,
    {
      select: (coins) => coins.filter((coin) => coin.market.startsWith('KRW')),
    },
  );
}
