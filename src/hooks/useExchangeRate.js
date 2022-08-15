import { useQuery } from '@tanstack/react-query';

import { fetchExchangeRate } from '../services/api';

export default function useExchangeRate() {
  return useQuery(['exchangeRate'], fetchExchangeRate, {
    refetchInterval: 1000 * 60,
  });
}
