import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { clearUser } from '../store/authSlice';
import { logoutFromFirebase } from '../firebase/authFunctions';
import ThemeToggle from './ThemeToggle';
import { Button } from '@heroui/react';

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    async function handleLogout() {
        try {
            await logoutFromFirebase();
            dispatch(clearUser());
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }

    return (
        <nav className={`flex items-center justify-between px-8 py-4 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300 ${isRTL ? 'flex-row-reverse' : ''}`}>

            {/* Links */}
            <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Link
                    to="/"
                    className="px-3 py-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 rounded-lg transition-all duration-200"
                >
                    {t('welcome')}
                </Link>
                <Link
                    to="/profile"
                    className="px-3 py-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 rounded-lg transition-all duration-200"
                >
                    {t('profile')}
                </Link>
            </div>

            {/* Right side */}
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <ThemeToggle />
                <Button
                    size="sm"
                    variant="flat"
                    onPress={handleLogout}
                    className="text-red-500 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-950/70 dark:text-red-400 font-medium rounded-lg"
                >
                    {t('logout')}
                </Button>
            </div>

        </nav>
    );
}

export default Navbar;