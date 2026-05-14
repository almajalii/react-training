/*
 *   <Chip active={isOn} onClick={toggle}>Plumbing</Chip>
 */
export default function Chip({
  active = false,
  onClick,
  children,
  className = '',
  ...props
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`
        px-3 py-1.5 rounded-full border text-sm font-medium transition-all
        ${active
          ? 'bg-accent text-on-accent border-accent'
          : 'border-line hover:border-line-2 text-ink'}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
