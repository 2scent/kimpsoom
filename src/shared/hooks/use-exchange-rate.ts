import { AxiosError } from 'axios';

import { useQuery, UseQueryResult } from '@tanstack/react-query';

import fetchExchangeRate from '../api/fetch-exchange-rate';

const intervalMs = 1000 * 60 * 5;

export default function useExchangeRate(): UseQueryResult<number, AxiosError> {
  return useQuery(['exchangeRate'], fetchExchangeRate, {
    refetchInterval: intervalMs,
  });
}
