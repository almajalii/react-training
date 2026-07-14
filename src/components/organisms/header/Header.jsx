import { Button } from '@heroui/react'
import { Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import logo from '../../../assets/logo.svg'
import { gfx } from '../../../styles/themeColors'
import LanguageSwitcher from '../../molecules/langaugeSwitcher/LanguageSwitcher'
import ThemeToggle from '../../molecules/themeToggle/ThemeToggle'
import UserMenuDrawer from '../userMenuDrawer/UserMenuDrawer'
import ServiceSearch from '../home/heroSection/ServiceSearch'
import useHeaderSearch from './useHeaderSearch'
import NotificationBell from '../../molecules/notifications/NotificationBell'
import { useHeader } from './useHeader'

export default function Header() {
  const { t, user, isActive, navLinks } = useHeader()
  const { isOpen: isSearchOpen, toggle: toggleSearch, wrapRef: searchRef } = useHeaderSearch()

  return (
    <header className="sticky top-0 z-50 w-full bg-page/85 backdrop-blur-md border-b border-line">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-8">
        {/* home screen */}
        <Link to="/" className="shrink-0">
          <img src={logo} alt="GoFix" className="w-15 h-15 object-contain" />
        </Link>
        {/* nav links */}
        <nav className="hidden md:flex items-center gap-7 flex-1">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-[15px] font-medium transition-colors py-2 ${
                isActive(link.to) ? 'text-ink font-semibold' : 'text-muted hover:text-ink'
              }`}
            >
              {t(link.labelKey)}
            </Link>
          ))}
        </nav>

        <div className="flex-1 hidden md:block" />

        {/* search */}
        <div className="relative" ref={searchRef}>
          <button
            type="button"
            onClick={toggleSearch}
            aria-label={t('nav_search') ?? 'Search'}
            aria-expanded={isSearchOpen}
            className="flex items-center justify-center w-9 h-9 rounded-full text-muted hover:text-ink hover:bg-page-2 transition-colors"
          >
            <Search size={18} />
          </button>

          {isSearchOpen && (
            <div className="absolute right-0 top-full mt-2 z-50 w-2xl">
              <ServiceSearch />
            </div>
          )}
        </div>

        {/* notifications — signed-in users only */}
        {user && <NotificationBell />}

        {/* preferences */}
        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />

          <span className="w-px h-5 bg-line mx-1" />
          {/* auth links */}
          {!user ? (
            <>
              <Link to="/login" className="text-[15px] font-medium text-muted hover:text-ink transition-colors px-1">
                {t('nav_sign_in')}
              </Link>
              <Button as={Link} to="/register" size="sm" className={`${gfx.btnPrimary} px-5 h-9 text-[14px]`}>
                {t('nav_sign_up')}
              </Button>
            </>
          ) : (
            <UserMenuDrawer />
          )}
        </div>
      </div>
    </header>
  )
}
