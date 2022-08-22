import { useQuery } from '@tanstack/react-query';

export default function useBybitPrice({ ticker }) {
  return useQuery(['bybit', ticker, 'price']);
}
