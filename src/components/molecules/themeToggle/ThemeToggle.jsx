import { Sun, Moon } from 'lucide-react';
import { useThemeToggle } from './useThemeToggle';

export default function ThemeToggle({ className = '' }) {
  const { isDark, toggle } = useThemeToggle();

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={`p-1.5 rounded-lg text-muted hover:text-ink hover:bg-page-2 transition-colors duration-150 cursor-pointer ${className}`}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
