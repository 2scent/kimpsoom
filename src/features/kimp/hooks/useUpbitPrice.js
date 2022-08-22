import { useQuery } from '@tanstack/react-query';

export default function useUpbitPrice({ ticker }) {
  return useQuery(['upbit', ticker, 'price']);
}
