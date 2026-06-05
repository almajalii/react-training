import { useMemo } from 'react';
import Input from '../../atoms/input/Input';
import Label from '../../atoms/label/Label';

export default function FormField({ label, name, id, type = 'text', error, touched, ...props }) {
  //prevent unnecessary re-renders by memoizing the error state and input ID
  const hasError = useMemo(() => error && touched, [error, touched]);
  const inputId = useMemo(() => id || name, [id, name]);

  return (
    <div className="mb-4">
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <Input id={inputId} type={type} name={name} error={error} touched={touched} {...props} />
      {hasError && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
