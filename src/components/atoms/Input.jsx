import { inputClass } from '../../styles/formStyle';

export default function Input({
  id,
  name,
  type = 'text',
  error,
  touched,
  ...props
}) {
  const hasError = error && touched;

  return (
    <input
      id={id || name}
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
