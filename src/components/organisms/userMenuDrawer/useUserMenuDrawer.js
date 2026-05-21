import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { clearUser } from '../../../store/authSlice';
import { logout } from '../../../network/api';

export function useUserMenuDrawer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { user } = useSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, right: 0, left: 'auto' });
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);

  const isRTL = i18n.language === 'ar';

  const initials = useMemo(
    () => `${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`.toUpperCase(),
    [user?.firstName, user?.lastName]
  );

  useEffect(() => {
    const handleClick = (e) => {
      if (triggerRef.current?.contains(e.target) || dropdownRef.current?.contains(e.target)) return;
      setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const handleOpen = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPos(
        isRTL
          ? { top: rect.bottom + 10, left: rect.left, right: 'auto' }
          : { top: rect.bottom + 10, right: window.innerWidth - rect.right, left: 'auto' }
      );
    }
    setIsOpen((v) => !v);
  }, [isRTL]);

  const handleLogout = useCallback(async () => {
    try {
      logout();
      dispatch(clearUser());
      navigate('/');
      close();
    } catch {
      toast.error('Logout failed, please try again');
      dispatch(clearUser());
      navigate('/');
      close();
    }
  }, [dispatch, navigate, close]);

  return {
    t,
    user,
    isOpen,
    pos,
    triggerRef,
    dropdownRef,
    initials,
    handleOpen,
    handleLogout,
    close,
  };
}
