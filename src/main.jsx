import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store, persistor } from './store/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'next-themes'
import { HeroUIProvider } from '@heroui/react'
import i18n from './locales/i18n.js'

// Set direction based on language
const setDirection = () => {
  const language = localStorage.getItem('i18nextLng') || 'en'
  const dir = language === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.dir = dir
  document.documentElement.lang = language
}

// Set on page load
setDirection()

// Listen for language changes
i18n.on('languageChanged', (lng) => {
  const dir = lng === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.dir = dir
  document.documentElement.lang = lng
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <HeroUIProvider>
            <App />
          </HeroUIProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)