import { useQuery } from '@tanstack/react-query';

import fetchExchangeRate from '../api/fetchExchangeRate';

const intervalMs = 1000 * 60 * 5;

export default function useExchangeRate() {
  return useQuery(['exchangeRate'], fetchExchangeRate, {
    refetchInterval: intervalMs,
  });
}
