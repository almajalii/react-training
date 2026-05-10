import { Link } from 'react-router-dom';

export default function MenuItem({ icon: Ico, label, to, onClick, danger = false }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm transition-colors ${
        danger
          ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10'
          : 'text-ink-soft hover:text-ink hover:bg-page-2'
      }`}
    >
      <span className={`shrink-0 ${danger ? 'text-red-500' : 'text-muted'}`}>
        <Ico className="w-4 h-4" />
      </span>
      {label}
    </Link>
  );
}