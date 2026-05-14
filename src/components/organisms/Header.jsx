import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from '@heroui/react';
import UserMenuDrawer from './UserMenuDrawer';
import ThemeToggle from '../molecules/ThemeToggle';
import LanguageSwitcher from '../molecules/LanguageSwitcher';
import { gfx } from '../../styles/themeColors';
import logo from '../../assets/logo.svg';

export default function Header() {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.auth);
  //useLocation() gives you the current URL. isActive returns true if the nav link matches the current page
  //so the active link gets bold styling.
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: '/browse', labelKey: 'nav_browse_services' },
    ...(user ? [{ to: '/my-bookings', labelKey: 'nav_my_bookings' }] : []),
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-page/85 backdrop-blur-md border-b border-line">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-8">
        {/*  logo */}
        <Link to="/" className="shrink-0">
          <img src={logo} alt="GoFix" className="w-15 h-15 object-contain" />
        </Link>

        <nav className="hidden md:flex items-center gap-7 flex-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-[15px] font-medium transition-colors py-2 ${isActive(link.to) ? 'text-ink font-semibold' : 'text-muted hover:text-ink'
                }`}
            >
              {t(link.labelKey)}
            </Link>
          ))}
        </nav>

        <div className="flex-1 hidden md:block" />

        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
          
          <span className="w-px h-5 bg-line mx-1" />

          {/*  logged in->user menu
          not logged in->sign in/sign up */}
          {!user ? (
            <>
              <Link
                to="/login"
                className="text-[15px] font-medium text-muted hover:text-ink transition-colors px-1"
              >
                {t('nav_sign_in')}
              </Link>
              <Button
                as={Link}
                to="/register"
                size="sm"
                className={`${gfx.btnPrimary} px-5 h-9 text-[14px]`}
              >
                {t('nav_sign_up')}
              </Button>
            </>
          ) : (
            <UserMenuDrawer />
          )}
        </div>

      </div>
    </header>
  );
}