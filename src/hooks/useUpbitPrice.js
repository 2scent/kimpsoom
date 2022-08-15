import { useQuery } from '@tanstack/react-query';

export default function useUpbitPrice({ code }) {
  return useQuery(['upbit', code]);
}
