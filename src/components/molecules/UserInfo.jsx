/**
 * UserInfo molecule — avatar + name/email/role display.
 * Theme-aware via CSS variables — no `dark:` prefixes needed.
 */
export default function UserInfo({
  avatar,
  firstName,
  lastName,
  email,
  role,
  size = 'md',
}) {
  const sizes = {
    sm: { avatar: 'w-8 h-8',   text: 'text-sm' },
    md: { avatar: 'w-12 h-12', text: 'text-base' },
    lg: { avatar: 'w-16 h-16', text: 'text-lg' },
  };

  return (
    <div className="flex items-center gap-3">
      {/* Avatar */}
      <div
        className={`
          ${sizes[size].avatar}
          rounded-full
          bg-linear-to-br from-brand to-brand-strong
          flex items-center justify-center
          text-white font-bold
          shrink-0
        `}
      >
        {avatar ? (
          <img
            src={avatar}
            alt={firstName}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span>{firstName?.[0]}{lastName?.[0]}</span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className={`font-semibold text-ink truncate ${sizes[size].text}`}>
          {firstName} {lastName}
        </p>
        <p className="text-xs text-muted truncate">{email}</p>
        {role && (
          <p className="text-xs text-muted capitalize">{role}</p>
        )}
      </div>
    </div>
  );
}