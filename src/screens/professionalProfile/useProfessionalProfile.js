import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { getProfessional } from '../../network/api';
import { getInitials } from '../../utils/initials';
import { proAvatarTone } from '../../styles/themeColors';
import { STAR_RATINGS } from '../../constants/ratings';

export function useProfessionalProfile() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('about');

  const { data: pro, isLoading: loading } = useQuery({
    queryKey: ['professional', id],
    queryFn: () => getProfessional(id).then((res) => res?.data ?? res),
  });

  const initials = useMemo(() => (pro ? getInitials(pro.name) : ''), [pro]);
  const toneClass = useMemo(() => proAvatarTone(0), []);
  const ratingBreakdown = useMemo(() => {
    if (!pro?.ratingBreakdown || !pro.reviewCount) return [];
    return STAR_RATINGS.map((star) => ({
      star,
      count: pro.ratingBreakdown[String(star)] ?? 0,
      pct: Math.round(((pro.ratingBreakdown[String(star)] ?? 0) / pro.reviewCount) * 100),
    }));
  }, [pro]);

  return {
    t,
    i18n,
    pro,
    loading,
    activeTab,
    setActiveTab,
    initials,
    toneClass,
    ratingBreakdown,
  };
}
