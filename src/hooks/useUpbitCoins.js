import { useQuery } from '@tanstack/react-query';

import { fetchUpbitCoins } from '../services/api';

export default function useUpbitCoins() {
  return useQuery(['upbitCoins'], fetchUpbitCoins);
}
