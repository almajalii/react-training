import { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { proAvatarTone } from '../../../styles/themeColors';
import { getInitials } from '../../../utils/initials';
import { getCityById } from '../../../constants/cities';
//pro-> professional data object
//index-> index of the card in the list
export function useProCard(pro, index) {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const initials = useMemo(() => getInitials(pro.name), [pro.name]);
    const toneClass = useMemo(() => proAvatarTone(index), [index]);
    const minPrice = useMemo(() => pro.services?.[0]?.minPrice, [pro.services]);
    //takes the cityid from areaid since api doesnt return city as of now.
    const cityName = useMemo(() => {
        const cityId = pro.serviceAreas?.[0]?.cityId;
        if (cityId == null) return null;
        const city = getCityById(cityId);
        return i18n.language === 'ar' ? city?.nameAr : city?.name;
    }, [pro.serviceAreas, i18n.language]);

    const goToProfile = useCallback(
        () => navigate(`/pro/${pro.id}`),
        [navigate, pro.id]);

    return { t, initials, toneClass, minPrice, cityName, goToProfile };
}