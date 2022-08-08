import { useQuery } from '@tanstack/react-query';

export default function useUpbit() {
  return useQuery(['upbit']);
}
