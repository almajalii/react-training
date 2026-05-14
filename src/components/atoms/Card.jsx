import { gfx } from '../../styles/themeColors';
export default function Card({ children, className = '', ...props }) {
  return (
    <div className={`${gfx.card} p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}