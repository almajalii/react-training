import { useQuery } from '@tanstack/react-query';
import { getProfessionals, filterProfessionals } from '../../network/api';
import { CATEGORY_SLUG_TO_ID } from '../../constants/categories';

export function useBrowseServices(categorySlug, filters) {
  const { data: professionals = [], isLoading: loading } = useQuery({
    queryKey: ['professionals', categorySlug, filters],
    queryFn: async () => {
      const categoryId = categorySlug ? CATEGORY_SLUG_TO_ID[categorySlug] : undefined;

      const hasActiveFilters = filters.minRating != null || filters.maxDistance != null || filters.minExp != null;

      let data;
      if (hasActiveFilters && categoryId != null) {
        data = await filterProfessionals({
          categoryId,
          minRating: filters.minRating ?? undefined,
          maxDistance: filters.maxDistance ?? undefined,
          minExp: filters.minExp ?? undefined,
        });
      } else {
        data = await getProfessionals(categoryId);
      }

      return Array.isArray(data) ? data : (data?.data ?? []);
    },
  });

  return { professionals, loading };
}
