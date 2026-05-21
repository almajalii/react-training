import { useTheme } from 'next-themes';
import { useCallback, useMemo } from 'react';

export function useThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = useMemo(() => theme === 'dark', [theme]);

  const toggle = useCallback(() => {
    setTheme(isDark ? 'light' : 'dark');
  }, [isDark, setTheme]);

  return { isDark, toggle };
}
