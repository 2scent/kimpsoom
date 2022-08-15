import { useQuery } from '@tanstack/react-query';

export default function useUpbit({ code }) {
  return useQuery(['upbit', code]);
}
