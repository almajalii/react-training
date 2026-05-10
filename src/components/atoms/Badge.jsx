import { Chip } from '@heroui/react';
import { goFixClasses } from '../../styles/themeColors';

export default function Badge({ children, variant = 'default', className = '', ...props }) {
  return (
    <Chip
      size="sm"
      className={`${variant === 'gofix' ? goFixClasses.badge : ''} ${className}`}
      {...props}
    >
      {children}
    </Chip>
  );
}
