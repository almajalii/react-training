import { useLanguageSwitcher } from './useLanguageSwitcher';

export default function LanguageSwitcher({ className = '' }) {
  const { isAR, toggle } = useLanguageSwitcher();

  return (
    <button
      onClick={toggle}
      aria-label="Switch language"
      className={`text-sm font-semibold text-muted hover:text-ink px-2.5 py-1.5 rounded-lg hover:bg-page-2 transition-colors duration-150 cursor-pointer ${className}`}
    >
      {isAR ? 'EN' : 'ع'}
    </button>
  );
}
