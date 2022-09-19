import { AxiosError } from 'axios';

import { useQuery, UseQueryResult } from '@tanstack/react-query';

import fetchUpbitTickers from '../api/fetchUpbitTickers';

export default function useUpbitKrwTickers(): UseQueryResult<string[], AxiosError> {
  return useQuery(
    ['upbit', 'tickers', 'krw'],
    fetchUpbitTickers,
  );
}