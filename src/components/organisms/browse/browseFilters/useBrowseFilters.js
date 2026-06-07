import { useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../../../../hooks/useCategories';
import { EMPTY_FILTERS } from '../../../../screens/browse/browseFiltersConstants';

export function useBrowseFilters(filters, onChange, categorySlug) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { categories, isLoading } = useCategories();

  const toggle = useCallback(
    (key, value) => onChange({ ...filters, [key]: filters[key] === value ? null : value }),
    [filters, onChange],
  );

  const reset = useCallback(() => onChange(EMPTY_FILTERS), [onChange]);

  const goToCategory = useCallback((slug) => navigate(slug ? `/browse/${slug}` : '/browse'), [navigate]);

  const hasActiveFilter = useMemo(() => Object.values(filters).some((v) => v !== null), [filters]);

  return { t, categories, isLoading, toggle, reset, hasActiveFilter, goToCategory };
}
