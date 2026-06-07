import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App.jsx';
import AppToast from './components/atoms/appToast/AppToast.jsx';
import i18n from './locales/i18n.js';
import { store, persistor } from './store/store.js';
import { ThemeProvider } from 'next-themes';
import { HeroUIProvider } from '@heroui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

const setDirection = () => {
  const language = localStorage.getItem('i18nextLng') || 'en';
  const dir = language === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.lang = language;
};

setDirection();

i18n.on('languageChanged', (lng) => {
  const dir = lng === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.lang = lng;
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <HeroUIProvider>
              <App />
              <AppToast />
            </HeroUIProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
