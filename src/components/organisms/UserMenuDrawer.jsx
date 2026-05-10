import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';
import { clearUser } from '../../store/authSlice';
import { apiClient } from '../../api/apiClient';
import { CalendarDays, MapPin, Bell, User, HelpCircle, Briefcase, LogOut, ChevronDown, Wrench } from 'lucide-react';
import MenuItem from '../molecules/MenuItem';

export default function UserMenuDrawer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, right: 0, left: 'auto' });
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    const handleClick = (e) => {
      if (triggerRef.current?.contains(e.target) || dropdownRef.current?.contains(e.target)) return;
      setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleOpen = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPos(isRTL
        ? { top: rect.bottom + 10, left: rect.left, right: 'auto' }
        : { top: rect.bottom + 10, right: window.innerWidth - rect.right, left: 'auto' }
      );
    }
    setIsOpen((v) => !v);
  };

  const close = () => setIsOpen(false);

  const handleLogout = () => {
    apiClient.auth.logout();
    dispatch(clearUser());
    navigate('/');
    close();
  };

  const initials = `${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`.toUpperCase();

  return (
    <>
      <button ref={triggerRef} onClick={handleOpen} className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0">
          <span className="text-[11px] font-bold text-brand">{initials}</span>
        </div>
        <span className="hidden sm:block text-[15px] font-medium text-ink">
          {user?.firstName}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          style={{ position: 'fixed', top: pos.top, right: pos.right, left: pos.left, zIndex: 9999 }}
          className="w-72 bg-elev border border-line rounded-2xl shadow-card-md overflow-hidden"
        >
          <div className="px-4 py-4 border-b border-line flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
              <span className="text-[12px] font-bold text-brand">{initials}</span>
            </div>
            <div className="min-w-0">
              <p className="font-bold text-ink text-sm truncate">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-muted mt-0.5 truncate">{user?.email}</p>
            </div>
          </div>

          <div className="py-2 px-2">
            <MenuItem icon={CalendarDays} label={t('nav_my_bookings')}            to="/my-bookings"           onClick={close} />
            {user?.isPro && <MenuItem icon={Wrench} label={t('menu_my_jobs')} to="/my-jobs" onClick={close} />}
            <MenuItem icon={MapPin}       label={t('menu_my_addresses')}          to="/my-addresses"          onClick={close} />
            <MenuItem icon={Bell}         label={t('menu_notification_settings')} to="/notification-settings" onClick={close} />
            <MenuItem icon={User}         label={t('menu_personal_information')}  to="/profile"               onClick={close} />
            <div className="h-px bg-line my-2 mx-1" />
            <MenuItem icon={Briefcase}  label={t('nav_become_a_pro')}  to="/become-a-pro" onClick={close} />
            <MenuItem icon={HelpCircle} label={t('menu_help_support')} to="/help"         onClick={close} />
            <div className="h-px bg-line my-2 mx-1" />
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              {t('nav_log_out')}
            </button>
          </div>
        </div>
      )}
    </>
  );
}