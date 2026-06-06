import { useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { proAvatarTone } from '../../../../styles/themeColors';
import { getInitials } from '../../../../utils/initials';
import { useCities } from '../../../../hooks/useCities';

export function useProCard(pro, index) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const cities = useCities();
  const isAr = i18n.language === 'ar';

  const initials = useMemo(() => getInitials(pro.name), [pro.name]);
  const toneClass = useMemo(() => proAvatarTone(index), [index]);
  const minPrice = useMemo(() => pro.services?.[0]?.minPrice, [pro.services]);

  const categoryName = useMemo(
    () => (isAr && pro.categoryAr ? pro.categoryAr : pro.category),
    [pro.category, pro.categoryAr, isAr],
  );

  const cityName = useMemo(() => {
    const cityId = pro.serviceAreas?.[0]?.cityId;
    if (!cityId) return null;
    const city = cities.find((c) => c.id === cityId);
    return isAr && city?.nameAr ? city.nameAr : (city?.name ?? null);
  }, [pro.serviceAreas, cities, isAr]);

  const goToProfile = useCallback(() => navigate(`/pro/${pro.id}`), [navigate, pro.id]);

  return { t, initials, toneClass, minPrice, categoryName, cityName, goToProfile };
}
