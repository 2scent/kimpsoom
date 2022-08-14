import { useQuery } from '@tanstack/react-query';

export default function useUpbit(coin) {
  return useQuery(['upbit', coin]);
}
