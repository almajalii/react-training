export function getInitials(name, fallback = '??') {
  if (!name || typeof name !== 'string') return fallback;
  const initials = name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  return initials || fallback;
}
