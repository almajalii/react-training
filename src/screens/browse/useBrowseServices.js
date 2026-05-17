import { useState, useCallback, useEffect } from 'react';
import { getProfessionals, filterProfessionals  } from '../../network/api';

// Maps URL slug → numeric categoryId used by the API
export const CATEGORY_ID_MAP = {
  plumbing: 1,
  electrical: 2,
  ac: 3,
  carpentry: 4,
  painting: 5,
  cleaning: 6,
  moving: 7,
  appliance: 8,
};

export function useBrowseServices(categorySlug, filters) {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPros = useCallback(async () => {
    setLoading(true);
    try {
      const categoryId = categorySlug ? CATEGORY_ID_MAP[categorySlug] : undefined;

      // Only use /filter when filter chips (rating, distance, experience) are active.
      // categoryId alone is NOT a filter — it's just passed to /professionals directly.
      // /filter requires categoryId, so we can't use it for the "All Categories" view.
      const hasActiveFilters =
        filters.minRating != null ||
        filters.maxDistance != null ||
        filters.minExp != null;

      let data;
      if (hasActiveFilters && categoryId != null) {
        // Filter endpoint — requires a categoryId, so only usable when a category is selected
        data = await filterProfessionals({
          categoryId,
          minRating: filters.minRating ?? undefined,
          maxDistance: filters.maxDistance ?? undefined,
          minExp: filters.minExp ?? undefined,
        });
      } else {
        // Default listing — works with or without a categoryId
        data = await getProfessionals(categoryId);
      }

      // Both endpoints return { success, message, data: [...] } — unwrap the array
      const list = Array.isArray(data) ? data : data?.data ?? [];
      setProfessionals(list);
    } catch {
      // Error toast fired automatically by responseInterceptor
      setProfessionals([]);
    } finally {
      setLoading(false);
    }
  }, [categorySlug, filters.minRating, filters.maxDistance, filters.minExp]);

  useEffect(() => {
    fetchPros();
  }, [fetchPros]);

  return { professionals, loading, refetch: fetchPros };
}