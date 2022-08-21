import { useQuery } from '@tanstack/react-query';

import fetchBybitCoins from '../api/fetchBybitCoins';

export default function useBybitCoins() {
  return useQuery(
    ['bybitCoins'],
    fetchBybitCoins,
    {
      select: (coins) => coins.filter((coin) => coin.quote_currency === 'USDT'),
    },
  );
}
