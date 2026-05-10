import { labelClass as baseLabelClass } from '../../styles/formStyle';

export default function Label({ htmlFor, children, className = '' }) {
  return (
    <label htmlFor={htmlFor} className={`${baseLabelClass} ${className}`}>
      {children}
    </label>
  );
}
