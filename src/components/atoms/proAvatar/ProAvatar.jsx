import { proAvatarTone } from '../../../styles/themeColors';
import { getInitials } from '../../../utils/initials';
import { useMemo } from 'react';

export default function ProAvatar({ name, imageUrl, index = 0, size = 'md' }) {
  const initials = useMemo(() => getInitials(name ?? ''), [name]);
  const toneClass = useMemo(() => proAvatarTone(index), [index]);

  const sizeClass =
    {
      sm: 'w-9  h-9  rounded-xl  text-xs',
      md: 'w-12 h-12 rounded-2xl text-base',
      lg: 'w-14 h-14 rounded-2xl text-lg',
      xl: 'w-16 h-16 rounded-2xl text-xl',
    }[size] ?? 'w-12 h-12 rounded-2xl text-base';

  return (
    <div className={`flex items-center justify-center font-bold shrink-0 overflow-hidden ${sizeClass} ${toneClass}`}>
      {imageUrl ? <img src={imageUrl} alt={initials} className="w-full h-full object-cover" /> : initials}
    </div>
  );
}
