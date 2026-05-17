import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getProfessional } from '../../network/api';
import { getInitials } from '../../utils/initials';
import { proAvatarTone } from '../../styles/themeColors';

export function useProfessionalProfile() {
    const { id } = useParams(); //reads the professional ID from the URL
    const { t, i18n } = useTranslation();
    const [pro, setPro] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('about');
    //fetches the professional's data based on the ID from the URL
    const fetchProbyId = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getProfessional(id);
            setPro(res?.data ?? res);
        } catch {
            //error handled by interceptor
        } finally {
            setLoading(false);
        }
    }, [id]);
    //fetches the professional's data when the component mounts or when the ID changes
    useEffect(() => {
        fetchProbyId();
    }, [fetchProbyId]);


    const initials = useMemo(() => pro ? getInitials(pro.name) : '', [pro?.name]);
    const toneClass = useMemo(() => proAvatarTone(0), []);
    const ratingBreakdown = useMemo(() => {
        if (!pro?.ratingBreakdown || !pro.reviewCount) return [];
        return [5, 4, 3, 2, 1].map((star) => ({
            star,
            count: pro.ratingBreakdown[String(star)] ?? 0,
            pct: Math.round(((pro.ratingBreakdown[String(star)] ?? 0) / pro.reviewCount) * 100),
        }));
    }, [pro?.ratingBreakdown, pro?.reviewCount]);

    return {
        t, i18n, pro, loading,
        activeTab, setActiveTab,
        initials, toneClass, ratingBreakdown,
    };
}