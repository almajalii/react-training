import { Link } from 'react-router-dom';
import { Button } from '@heroui/react';
import UserMenuDrawer from '../userMenuDrawer/UserMenuDrawer';
import ThemeToggle from '../../molecules/themeToggle/ThemeToggle';
import LanguageSwitcher from '../../molecules/langaugeSwitcher/LanguageSwitcher';
import { gfx } from '../../../styles/themeColors';
import logo from '../../../assets/logo.svg';
import { useHeader } from './useHeader';

export default function Header() {
    const { t, user, isActive, navLinks } = useHeader();

    return (
        <header className="sticky top-0 z-50 w-full bg-page/85 backdrop-blur-md border-b border-line">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-8">
                {/* home screen */}
                <Link to="/" className="shrink-0">
                    <img src={logo} alt="GoFix" className="w-15 h-15 object-contain" />
                </Link>
                {/* nav links */}
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
                {/* preferences */}
                <div className="flex items-center gap-1">
                    <LanguageSwitcher />
                    <ThemeToggle />

                    <span className="w-px h-5 bg-line mx-1" />
                    {/* auth links */}
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