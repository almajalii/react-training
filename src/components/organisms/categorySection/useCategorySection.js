import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CATEGORIES } from '../../../constants/categories';

export function useCategorySection() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const goToCategory = useCallback(
    (slug) => navigate(`/browse/${slug}`),
    [navigate] //navigate is stable, but it's good practice to include it in the dependency array
  );

  return { t, CATEGORIES, goToCategory };
}