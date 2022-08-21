import { useQuery } from '@tanstack/react-query';

export default function useBybitPrice({ code }) {
  return useQuery(['bybit', code]);
}
