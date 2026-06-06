import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { getCategories } from '../network/api';
import {
  getIconForCategory,
  CATEGORY_ID_TO_SLUG,
  CATEGORY_DESCRIPTIONS,
  CATEGORY_DESCRIPTIONS_AR,
} from '../constants/categories';

export function useCategories() {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const { data: raw, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await getCategories();
      const list = res?.data ?? res;
      return Array.isArray(list) ? list : [];
    },
    staleTime: 10 * 60 * 1000,
  });

  const categories = useMemo(() => {
    if (!Array.isArray(raw)) return [];
    return raw.map((cat) => ({
      ...cat,
      displayName: isAr && cat.nameAr ? cat.nameAr : cat.name,
      description: isAr
        ? (CATEGORY_DESCRIPTIONS_AR[cat.id] ?? CATEGORY_DESCRIPTIONS[cat.id] ?? '')
        : (CATEGORY_DESCRIPTIONS[cat.id] ?? ''),
      Icon: getIconForCategory(cat.name),
      slug: CATEGORY_ID_TO_SLUG[cat.id] ?? cat.name.toLowerCase().replace(/\s+/g, '-'),
    }));
  }, [raw, isAr]);

  return { categories, isLoading };
}
