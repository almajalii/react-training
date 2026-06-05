import { useMemo } from 'react';
import { inputClass } from '../../../styles/formStyle';
export default function Input({ id, name, type = 'text', error, touched, ...props }) {
  const hasError = useMemo(() => error && touched, [error, touched]);
  const inputId = useMemo(() => id || name, [id, name]);

  return (
    <input
      id={inputId}
      type={type}
      name={name}
      className={`
        ${inputClass}
        ${hasError ? 'border-red-500 focus:ring-red-500/10' : ''}
      `}
      {...props}
    />
  );
}
