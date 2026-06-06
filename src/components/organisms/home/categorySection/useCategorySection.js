import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../../../../hooks/useCategories';

export function useCategorySection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { categories, isLoading } = useCategories();

  const goToCategory = useCallback((slug) => navigate(`/browse/${slug}`), [navigate]);

  return { t, categories, isLoading, goToCategory };
}
