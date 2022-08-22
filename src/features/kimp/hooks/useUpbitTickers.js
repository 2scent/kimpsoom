import { useQuery } from '@tanstack/react-query';

import fetchUpbitTickers from '../api/fetchUpbitTickers';

export default function useUpbitKrwTickers() {
  return useQuery(
    ['upbit', 'tickers', 'krw'],
    fetchUpbitTickers,
  );
}
