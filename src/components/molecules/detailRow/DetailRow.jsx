export default function DetailRow({ icon: Icon, label, value, mono = false, price = false }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-line last:border-0">
      <div className="w-8 h-8 rounded-lg bg-surface-2 flex items-center justify-center shrink-0">
        <Icon size={15} className="text-muted" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11.5px] font-semibold uppercase tracking-wide text-muted mb-0.5">{label}</p>
        <p
          className={`text-[14.5px] text-ink
          ${mono ? 'font-mono' : ''}
          ${price ? 'text-ok font-mono font-semibold' : ''}`}
        >
          {value || '—'}
        </p>
      </div>
    </div>
  );
}
