import { useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../../../../constants/categories';
import { EMPTY_FILTERS } from '../../../../screens/browse/browseFiltersConstants';

export function useBrowseFilters(filters, onChange, categorySlug) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  // chip toggle
  const toggle = useCallback(
    (key, value) => onChange({ ...filters, [key]: filters[key] === value ? null : value }),
    [filters, onChange]
  );
  // reset filters
  const reset = useCallback(() => onChange(EMPTY_FILTERS), [onChange]);
  //navigate to category
  const goToCategory = useCallback(
    (slug) => navigate(slug ? `/browse/${slug}` : '/browse'),
    [navigate]
  );
  // check if any filter is active
  const hasActiveFilter = useMemo(() => Object.values(filters).some((v) => v !== null), [filters]);

  return { t, CATEGORIES, toggle, reset, hasActiveFilter, goToCategory };
}
