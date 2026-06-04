export default function TabBar({ tabs, active, onChange, className = '' }) {
  return (
    <div className={`flex gap-1 border-b border-line ${className}`}>
      {tabs.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={[
            'px-4 py-4 text-[14.5px] font-medium border-b-2 -mb-px transition-colors duration-150',
            active === key
              ? 'border-brand text-ink font-semibold'
              : 'border-transparent text-muted hover:text-ink',
          ].join(' ')}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
