import { AxiosError } from 'axios';

import { useQuery, UseQueryResult } from '@tanstack/react-query';

import fetchUpbitTickers from '../api/fetchUpbitTickers';

export default function useUpbitTickers(): UseQueryResult<string[], AxiosError> {
  return useQuery(
    ['upbit', 'tickers', 'krw'],
    fetchUpbitTickers,
  );
}
