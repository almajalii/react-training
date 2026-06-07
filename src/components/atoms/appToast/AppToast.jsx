import { useTheme } from 'next-themes';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import { useMemo } from 'react';
export default function AppToast() {
  const { theme } = useTheme();
  const { i18n } = useTranslation();
  const isRTL = useMemo(() => i18n.language === 'ar', [i18n.language]);

  return (
    <ToastContainer
      position={isRTL ? 'top-left' : 'top-right'}
      autoClose={4000}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      draggable
      theme={theme === 'dark' ? 'dark' : 'light'}
      limit={3}
      rtl={isRTL}
    />
  );
}
