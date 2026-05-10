import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../../api/apiClient';

// Maps URL slug → numeric categoryId used by the API
export const CATEGORY_ID_MAP = {
  plumbing:   1,
  electrical: 2,
  ac:         3,
  carpentry:  4,
  painting:   5,
  cleaning:   6,
  moving:     7,
  appliance:  8,
};

export function useBrowseServices(categorySlug, filters) {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPros = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const categoryId = categorySlug ? CATEGORY_ID_MAP[categorySlug] : undefined;

      // Use /professionals/filter when any filter is active; otherwise /professionals
      const hasFilters =
        categoryId != null ||
        filters.minRating != null ||
        filters.maxDistance != null ||
        filters.minExp != null;

      let data;
      if (hasFilters) {
        data = await apiClient.professionals.filter({
          categoryId,
          minRating:   filters.minRating   ?? undefined,
          maxDistance: filters.maxDistance ?? undefined,
          minExp:      filters.minExp      ?? undefined,
        });
      } else {
        data = await apiClient.professionals.list();
      }

      setProfessionals(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
      setProfessionals([]);
    } finally {
      setLoading(false);
    }
  }, [categorySlug, filters.minRating, filters.maxDistance, filters.minExp]);

  useEffect(() => {
    fetchPros();
  }, [fetchPros]);

  return { professionals, loading, error, refetch: fetchPros };
}
