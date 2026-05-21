import { useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export function useHeader() {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.auth);
  //gives current path to determine active link.
  const location = useLocation();
  //callback  to rerender only when path changes.
  const isActive = useCallback((path) => location.pathname === path, [location.pathname]);
  //nav links array with memo to avoid unnecessary recalculations.
  const navLinks = useMemo(
    () => [
      { to: '/browse', labelKey: 'nav_browse_services' },
      ...(user ? [{ to: '/my-bookings', labelKey: 'nav_my_bookings' }] : []),
    ],
    [user]
  );

  return { t, user, isActive, navLinks };
}
