import { useQuery } from '@tanstack/react-query';

export default function useBybit(coin) {
  return useQuery(['bybit', coin]);
}
