// Returns a human-readable "time ago" string in English or Arabic.
// Usage: timeAgo(dateStr, 'ar')  →  "منذ يومين"
//        timeAgo(dateStr, 'en')  →  "2 days ago"

const timeAgo = (dateStr, lang = 'en') => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  const isAr = lang === 'ar';

  if (isAr) {
    if (days === 0) return 'اليوم';
    if (days === 1) return 'منذ يوم';
    if (days === 2) return 'منذ يومين';
    if (days < 7) return `منذ ${days} أيام`;
    const weeks = Math.floor(days / 7);
    if (weeks === 1) return 'منذ أسبوع';
    if (weeks === 2) return 'منذ أسبوعين';
    if (weeks < 4) return `منذ ${weeks} أسابيع`;
    const months = Math.floor(days / 30);
    if (months === 1) return 'منذ شهر';
    if (months === 2) return 'منذ شهرين';
    return `منذ ${months} أشهر`;
  }

  if (days === 0) return 'Today';
  if (days === 1) return '1 day ago';
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  if (weeks === 1) return '1 week ago';
  if (weeks < 4) return `${weeks} weeks ago`;
  const months = Math.floor(days / 30);
  if (months === 1) return '1 month ago';
  return `${months} months ago`;
};

export default timeAgo;
