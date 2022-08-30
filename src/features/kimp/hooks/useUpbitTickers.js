import { useQuery } from '@tanstack/react-query';

import fetchUpbitTickers from '../api/fetchUpbitTickers';

export default function useUpbitKrwTickers({ onSuccess, select } = {}) {
  return useQuery(
    ['upbit', 'tickers', 'krw'],
    fetchUpbitTickers,
    { onSuccess, select },
  );
}
