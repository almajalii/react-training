import { useQuery } from '@tanstack/react-query';
import { getCities } from '../network/api';

export function useCities() {
  const { data: cities = [] } = useQuery({
    queryKey: ['cities'],
    queryFn: async () => {
      const res = await getCities();
      const list = res?.data ?? res;
      return Array.isArray(list) ? list : [];
    },
    staleTime: 10 * 60 * 1000,
  });
  return cities;
}
